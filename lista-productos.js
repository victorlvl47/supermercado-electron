// var res = document.getElementById('respuesta');
var editarElement = document.getElementsByClassName('more');
var pedidoElements = document.getElementsByClassName('realizar-pedido');

window.comunicacion.inicioCorrecto(function(event, args) {
    // res.innerHTML = args;
    console.log("inicioCorrecto");
});



for (let item of editarElement) {
    item.addEventListener("click", function() {
        console.log("editar");

        window.comunicacion.editarProducto();
    });
}


for (let item of pedidoElements) {
    item.addEventListener("click", function() {
        console.log("pedido");

        window.comunicacion.solicitarPedidoProducto();
    });
}