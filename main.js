const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const mysql = require('mysql2');

// -----------------------------------------------------------------------------
// 
// Crear conexion
// 

const conexion = mysql.createConnection({
    host: 'localhost', 
    user: 'supermercado-usr', 
    password: 'rNCJv9mkmWK469xC',
    database: 'supermercado_electron'
});

// -----------------------------------------------------------------------------

let ventana;

// Create window
function createWindow() {
    ventana = new BrowserWindow({
        width: 640, 
        height: 360, 
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    ventana.loadFile('index.html');
}



let listaProductosVentana;
// Create window
function createListaProductosWindow() {
    listaProductosVentana = new BrowserWindow({
        width: 640, 
        height: 360, 
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    listaProductosVentana.loadFile('lista-productos.html');
}

ipcMain.on('registroValido', function(event, args) {
    console.log(args);

    conexion.promise()
        .execute("SELECT * FROM usuarios WHERE numero_usuario = ? AND contrasena_usuario = ?", [args[0], args[1]])
        .then(([results, fields]) => {
            if (results.length > 0) {
                createListaProductosWindow();
                listaProductosVentana.webContents.on('did-finish-load', function() {
                    listaProductosVentana.webContents.send('inicioCorrecto', 'Bienvenido');
                });
            }
            else {
                console.log("Couldn't find the user");
            }
        });
    // ventana.webContents.send('inicioCorrecto', 'Bienvenido');
});


let editProductoWindow;

function createEditProductoWindow() {
    editProductoWindow = new BrowserWindow({
        width: 640, 
        height: 360, 
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    editProductoWindow.loadFile('edit-producto.html');
}


ipcMain.on("editarProducto", function(event, args) {
    console.log("editar producto!");

    createEditProductoWindow();
    editProductoWindow.webContents.on('did-finish-load', function() {
        editProductoWindow.webContents.send('editThisProduct', 'Producto 1');
    });
});


let pedidoProductoWindow;

function createPedidoProductoWindow() {
    pedidoProductoWindow = new BrowserWindow({
        width: 640, 
        height: 360, 
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    pedidoProductoWindow.loadFile('pedido-producto.html');
}


ipcMain.on("solicitarPedidoProducto", function(event, args) {
    console.log("solicitar pedido producto!");

    createPedidoProductoWindow();
    pedidoProductoWindow.webContents.on('did-finish-load', function() {
        pedidoProductoWindow.webContents.send('pedidoProducto', 'Producto 1');
    });
});

app.whenReady().then(createWindow);