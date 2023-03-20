const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

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
function createWindow2() {
    listaProductosVentana = new BrowserWindow({
        width: 640, 
        height: 360, 
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    listaProductosVentana.loadFile('segundo.html');
}

ipcMain.on('registroValido', function(event, args) {
    console.log(args);
    createWindow2();
    listaProductosVentana.webContents.on('did-finish-load', function() {
        listaProductosVentana.webContents.send('inicioCorrecto', 'Bienvenido');
    });
    // ventana.webContents.send('inicioCorrecto', 'Bienvenido');
});

app.whenReady().then(createWindow);