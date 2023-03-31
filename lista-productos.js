// var res = document.getElementById('respuesta');
var editarElement = document.getElementsByClassName('more');
var pedidoElements = document.getElementsByClassName('realizar-pedido');

window.comunicacion.inicioCorrecto(function(event, args) {
    // res.innerHTML = args;
    console.log("inicioCorrecto");

    var products_list = args;

    // get the table body element
    var tbody = document.querySelector('#products-list');
    tbody.innerHTML = '';

    // loop through the products_list and create a row for each product
    for (var i = 0; i < products_list.length; i++) {
        
        var product = products_list[i];
        var row = document.createElement('tr');

        // create the columns and add the product data to them
        var idColumn = document.createElement('td');
        idColumn.className = "id-product";
        idColumn.id = "id-producto-" + product.id_producto;
        idColumn.textContent = product.id_producto;

        var nameColumn = document.createElement('td');
        var nameLink = document.createElement('a');
        nameLink.href = '#';
        nameLink.textContent = product.nombre_producto;
        nameColumn.appendChild(nameLink);

        var descriptionColumn = document.createElement('td');
        descriptionColumn.textContent = product.descripcion_producto;

        var categoryColumn = document.createElement('td');
        categoryColumn.textContent = product.categoria_producto;

        var inventoryColumn = document.createElement('td');
        inventoryColumn.textContent = product.inventario_producto;

        var editColumn = document.createElement('td');
        var editLink = document.createElement('a');
        editLink.href = '#';
        editLink.className = 'more';
        editLink.textContent = 'Editar';
        editLink.addEventListener('click', function(event) {
            console.log("editar");

            event.preventDefault();
            var idProduct = this.closest('tr').querySelector('.id-product').textContent;
            console.log(idProduct);

            window.comunicacion.editarProducto(idProduct);
        });
        editColumn.appendChild(editLink);

        var orderColumn = document.createElement('td');
        orderColumn.className = 'realizar-pedido';
        orderColumn.textContent = 'Pedido';
        orderColumn.addEventListener('click', function(event) {
            console.log("pedido");

            event.preventDefault();
            var idProduct = this.closest('tr').querySelector('.id-product').textContent;
            console.log(idProduct);

            window.comunicacion.solicitarPedidoProducto();
        });

        // add the columns to the row
        row.appendChild(idColumn);
        row.appendChild(nameColumn);
        row.appendChild(descriptionColumn);
        row.appendChild(categoryColumn);
        row.appendChild(inventoryColumn);
        row.appendChild(editColumn);
        row.appendChild(orderColumn);
      

        // add the row to the table body
        tbody.appendChild(row);
    }
});