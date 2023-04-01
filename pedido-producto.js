
function createSupplierSelect(suppliers) {
    const select = document.createElement('select');
    select.setAttribute('name', 'proveedores');
    select.setAttribute('id', 'proveedores');
  
    suppliers.forEach((supplier) => {
      const option = document.createElement('option');
      option.setAttribute('value', supplier.nombre_proveedor);
      option.textContent = supplier.nombre_proveedor;
      select.appendChild(option);
    });
  
    return select;
}

function setProductInfo(id, nombre) {
    var idElement = document.getElementById('producto-id');
    var nombreElement = document.getElementById('producto-nombre');
  
    idElement.textContent = 'Producto ID: ' + id;
    nombreElement.textContent = nombre;
}

function getFormData() {
    const supplier = document.querySelector('#proveedores').value;
    const quantity = document.querySelector('#cantidad').value;
    return {supplier, quantity};
}
  


window.comunicacion.pedidoProducto(function(event, args) {

    setProductInfo(args[1].id_producto, args[1].nombre_producto);
    
    // let proveedores_list = args;
    var formLogin = document.getElementById('form-login');
    const supplierNames = args[0];
    const supplierSelect = createSupplierSelect(supplierNames);
    formLogin.insertBefore(supplierSelect, formLogin.children[1]);

    var formulario = document.getElementById('form-login');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = getFormData();
        const pedido = {
            id_proveedor: formData.supplier, 
            id_producto: args[1].id_producto, 
            cantidad_pedido: formData.quantity
        };

        
    });
});

const cancelarBtn = document.getElementById('cancelar-btn');
cancelarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.close();
});