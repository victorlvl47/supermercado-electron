window.comunicacion.pedidoProducto(function(event, args) {
    
    let proveedores_list = args;
});

const cancelarBtn = document.getElementById('cancelar-btn');
cancelarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.close();
});