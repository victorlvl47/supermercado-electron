
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


window.comunicacion.pedidoProducto(function(event, args) {

    setProductInfo(args[1].id_producto, args[1].nombre_producto);
    
    // let proveedores_list = args;
    var formLogin = document.getElementById('form-login');
    const supplierNames = args[0];
    const supplierSelect = createSupplierSelect(supplierNames);
    formLogin.insertBefore(supplierSelect, formLogin.children[1]);
});

const cancelarBtn = document.getElementById('cancelar-btn');
cancelarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.close();
});