var formulario = document.getElementById('form-login');
var pass = document.getElementById('pass-login');
var nombre = document.getElementById('nombre-login');

var expMay = RegExp("[A-Z]");
var expMin = RegExp("[a-z]");
var expNum = RegExp("[0-9]");
var expPass = RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}")

formulario.addEventListener('submit', function(event) {
    
    event.preventDefault();

    var errorMsg = " ";
    if (!pass.value.match(expPass)) {
        errorMsg = "la contrasena debe tener 8 caracteres, 1 mayuscula, etc."
    }

    if (errorMsg = " ") {
        window.comunicacion.registroValido([nombre.value, pass.value]);
    }
    else {
        alert(errorMsg);
    }
    
});

// window.comunicacion.inicioCorrecto(function(event, args) {
//     alert(args);
// });