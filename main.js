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

ipcMain.on('registroValido', function(event, args) {
    console.log(args);
});

app.whenReady().then(createWindow);