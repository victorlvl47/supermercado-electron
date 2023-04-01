
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


window.comunicacion.pedidoProducto(function(event, args) {
    
    // let proveedores_list = args;
    var formLogin = document.getElementById('form-login');
    const supplierNames = args;
    const supplierSelect = createSupplierSelect(supplierNames);
    formLogin.insertBefore(supplierSelect, formLogin.children[1]);
});

const cancelarBtn = document.getElementById('cancelar-btn');
cancelarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.close();
});