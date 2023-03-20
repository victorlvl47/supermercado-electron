// var res = document.getElementById('respuesta');
var editarElement = document.getElementsByClassName('more');

window.comunicacion.inicioCorrecto(function(event, args) {
    // res.innerHTML = args;
    console.log("inicioCorrecto");
});



for (let item of editarElement) {
    item.addEventListener("click", function() {
        alert("editar");

        window.comunicacion.editarProducto();
    });
}