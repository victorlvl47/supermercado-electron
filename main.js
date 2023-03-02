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



let ventana2;
// Create window
function createWindow2() {
    ventana2 = new BrowserWindow({
        width: 640, 
        height: 360, 
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    ventana2.loadFile('segundo.html');
}

ipcMain.on('registroValido', function(event, args) {
    console.log(args);
    createWindow2();
    ventana2.webContents.on('did-finish-load', function() {
        ventana2.webContents.send('inicioCorrecto', 'Bienvenido');
    });
    // ventana.webContents.send('inicioCorrecto', 'Bienvenido');
});

app.whenReady().then(createWindow);