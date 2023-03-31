

window.comunicacion.editThisProduct(function(event, args) {

    let productoInfo = args[0];

    document.getElementById("producto-id").textContent = "Producto ID: " + productoInfo.id_producto;

    const nombreProductoInput = document.getElementById('nombre-login');
    nombreProductoInput.value = productoInfo.nombre_producto

    const descripcionProductoInput = document.getElementById('descripcion');
    descripcionProductoInput.value = productoInfo.descripcion_producto;

    const categoriaInput = document.getElementById('categoria');
    categoriaInput.value = productoInfo.categoria_producto;

    const inventarioInput = document.getElementById('inventario');
    inventarioInput.value = productoInfo.inventario_producto;

    var formulario = document.getElementById('form-login');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        let product = {
            id_producto: productoInfo.id_producto, 
            nombre_producto: nombreProductoInput.value, 
            descripcion_producto: descripcionProductoInput.value, 
            categoria_producto: categoriaInput.value, 
            inventario_producto: inventarioInput.value
        };
            
        window.comunicacion.updateProduct(product);
    });

});




const cancelarBtn = document.getElementById('cancelar-btn');
cancelarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.close();
});