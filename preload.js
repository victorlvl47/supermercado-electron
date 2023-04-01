const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld(
    'comunicacion', 
    {
        registroValido: (datos) => ipcRenderer.send('registroValido', datos), 
        inicioCorrecto: (callback) => ipcRenderer.on('inicioCorrecto', callback), 
        editarProducto: (datos) => ipcRenderer.send('editarProducto', datos), 
        editThisProduct: (callback) => ipcRenderer.on('editThisProduct', callback), 
        solicitarPedidoProducto: (datos) => ipcRenderer.send('solicitarPedidoProducto', datos), 
        pedidoProducto: (callback) => ipcRenderer.on('pedidoProducto', callback), 
        updateProduct: (datos) => ipcRenderer.send('updateProduct', datos), 
        orderProduct: (datos) => ipcRenderer.send('orderProduct', datos), 
        nuevoPedidoAgregado: (callback) => ipcRenderer.on('nuevoPedidoAgregado', callback)
    }
);