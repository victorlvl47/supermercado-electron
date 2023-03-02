var formulario = document.getElementById('form-login');

formulario.addEventListener('submit', function(event) {
    
    event.preventDefault();

    alert("Bienvenido " + document.getElementById('nombre-login').value)
});