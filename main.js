// TODO: Encriptar contrasenas usuario

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

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
        width: 1440,  
        height: 810, 
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    listaProductosVentana.loadFile('lista-productos.html');
}

ipcMain.on('registroValido', function(event, args) {
    // console.log(args);

    var plaintextPassword = args[1];
    var numero_usuario = args[0]

    conexion.promise()
        .execute("SELECT * FROM usuarios WHERE numero_usuario = ?", [numero_usuario])
        .then(([results, fields]) => {
        
            if (results.length > 0) {

                var hash = results[0].contrasena_usuario;
                bcrypt.compare(plaintextPassword, hash, function(err, result) {

                    if (err) {
                        console.error(err);
                    }
                    else {
                        if (result) {
                            // Get products and orders if any
                            conexion.promise()
                            .execute(`SELECT p.*, COALESCE(pedidos.total_cantidad_pedido, 0) as total_cantidad_pedido
                            FROM productos p
                            LEFT JOIN (
                            SELECT id_producto, SUM(cantidad_pedido) AS total_cantidad_pedido
                            FROM pedidos
                            GROUP BY id_producto
                            ) pedidos ON p.id_producto = pedidos.id_producto`)
                            .then(([results, fields]) => {
                                
                                createListaProductosWindow();
                                listaProductosVentana.webContents.on('did-finish-load', function() {
                                    listaProductosVentana.webContents.send('inicioCorrecto', results);
                                });
                                
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        }
                    }
                });
            }
            else {
                console.log("Couldn't find the user");
            }
        })
        .catch((error) => {
            console.log(error);
        });;
    // ventana.webContents.send('inicioCorrecto', 'Bienvenido');
});


let editProductoWindow;

function createEditProductoWindow() {
    editProductoWindow = new BrowserWindow({
        width: 960, 
        height: 540, 
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    editProductoWindow.loadFile('edit-producto.html');
}


ipcMain.on("editarProducto", function(event, args) {

    conexion.promise()
    .execute("SELECT * FROM productos WHERE id_producto = ?", [args])
    .then(([results, fields]) => {
        if (results.length > 0) {
            createEditProductoWindow();
            editProductoWindow.webContents.on('did-finish-load', function() {
                editProductoWindow.webContents.send('editThisProduct', results);
            });
        }
    })
    .catch((error) => {
        console.log(error);
    });
});


ipcMain.on("updateProduct", function(event, args) {
      
    var id = args.id_producto;
    var nombre = args.nombre_producto;
    var descripcion = args.descripcion_producto;
    var categoria = args.categoria_producto;
    var inventario = args.inventario_producto;
    conexion.promise()
    .execute("UPDATE productos SET nombre_producto = ?, descripcion_producto = ?, categoria_producto = ?, inventario_producto = ? WHERE id_producto = ?", [nombre, descripcion, categoria, inventario, id])
    .then(([results, fields]) => {
        console.log("Product updated successfully");

        // Get productos and orders if any
        conexion.promise()
        .execute(`SELECT p.*, COALESCE(pedidos.total_cantidad_pedido, 0) as total_cantidad_pedido
        FROM productos p
        LEFT JOIN (
            SELECT id_producto, SUM(cantidad_pedido) AS total_cantidad_pedido
            FROM pedidos
            GROUP BY id_producto
        ) pedidos ON p.id_producto = pedidos.id_producto`)
        .then(([results, fields]) => {
            listaProductosVentana.webContents.send('inicioCorrecto', results);
        });
    })
    .catch((error) => {
        console.log(error);
    });

});


let pedidoProductoWindow;

function createPedidoProductoWindow() {
    pedidoProductoWindow = new BrowserWindow({
        width: 960, 
        height: 540, 
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    pedidoProductoWindow.loadFile('pedido-producto.html');
}


ipcMain.on("solicitarPedidoProducto", function(event, args) {

    // Get proveedores
    conexion.promise()
    .execute("SELECT * FROM proveedores")
    .then(([results, fields]) => {

        var proveedores_list = results;

        // Get product
        conexion.promise()
        .execute("SELECT * FROM productos WHERE id_producto = ?", [args])
        .then(([results, fields]) => {
            if (results.length > 0) {

                var productInfo = results[0];

                createPedidoProductoWindow();
                pedidoProductoWindow.webContents.on('did-finish-load', function() {
                    pedidoProductoWindow.webContents.send('pedidoProducto', [proveedores_list, productInfo]);
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
});


ipcMain.on("orderProduct", function(event, args) {

    var id_proveedor = args.id_proveedor;
    var id_producto = args.id_producto;
    var cantidad_pedido = args.cantidad_pedido;

    conexion.promise()
    .execute("SELECT * FROM pedidos WHERE id_proveedor = ? AND id_producto = ?", [id_proveedor, id_producto])
    .then(([pedidos, fields]) => {
        if (pedidos.length > 0) {
            console.log("Ese pedido ya existe!");

            pedidoProductoWindow.webContents.send('nuevoPedidoAgregado', "No se realizo el pedido. El pedido ya existe.");
        }
        else {
            conexion.promise()
            .execute("INSERT INTO pedidos (id_proveedor, id_producto, cantidad_pedido) VALUES (?, ?, ?)", [id_proveedor, id_producto, cantidad_pedido])
            .then(([results, fields]) => {
                console.log("New order added successfully");

                // Get products and orders if any
                conexion.promise()
                .execute(`SELECT p.*, COALESCE(pedidos.total_cantidad_pedido, 0) as total_cantidad_pedido
                FROM productos p
                LEFT JOIN (
                    SELECT id_producto, SUM(cantidad_pedido) AS total_cantidad_pedido
                    FROM pedidos
                    GROUP BY id_producto
                ) pedidos ON p.id_producto = pedidos.id_producto`)
                .then(([results, fields]) => {
                        
                    listaProductosVentana.webContents.send('inicioCorrecto', results);
                    pedidoProductoWindow.webContents.send('nuevoPedidoAgregado', "Nuevo pedido añadido con éxito");
                        
                })
                .catch((error) => {
                    console.log(error);
                });;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    })
    .catch((error) => {
        console.log(error);
    });
});

app.whenReady().then(createWindow);