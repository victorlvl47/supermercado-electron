

window.comunicacion.editThisProduct(function(event, args) {

    let productoInfo = args[0];

    document.getElementById("producto-id").textContent = "Producto ID: " + productoInfo.id_producto;

    const nombreProductoInput = document.getElementById('nombre-login');
    nombreProductoInput.value = productoInfo.nombre_producto

    const descripcionProductoInput = document.getElementById('descripcion');
    descripcionProductoInput.value = productoInfo.descripcion_producto;

});