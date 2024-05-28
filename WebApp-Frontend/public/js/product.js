var _urlBackend


$(document).ready(function() {
    agregarCategorias()
    MostrarProductos();     
});

//*******************************//
//****** Mostrar Tabla  ******//
//*****************************//

function MostrarProductos(filtro) {
    _urlBackend = getUrlBackend(); // http://localhost:3005/
    var url = _urlBackend + "producto/obtenerProductos";

    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            var tbody = $('#dataTables tbody');
            tbody.empty();
        
            if (Array.isArray(response.Data)) {
                response.Data.forEach(function(producto, index) {
                    var mostrarProducto = true;
                    if (filtro === 'habilitadas' && producto.estado_producto !== 1) {
                        mostrarProducto = false;
                    }
                    if (filtro === 'deshabilitadas' && producto.estado_producto !== 0) {
                        mostrarProducto = false;
                    }

                    if (mostrarProducto) {
                        var estadoTexto = producto.estado_producto === 1
                            ? `<button type="button" class="btn btn-success" onclick="actualizarEstado(${producto.id_producto})"><i class="fas fa-fw fa-check"></i></button>`
                            : `<button type="button" class="btn btn-danger" onclick="actualizarEstado(${producto.id_producto})"><i class="fas fa-fw fa-close"></i></button>`;

                        var imagenUrl = producto.imagen ? _urlBackend + producto.imagen.replace(/\\/g, '/') : '/path/to/default/image.jpg';

                        tbody.append(
                            `<tr>
                                <td>${index + 1}</td>
                                <td><img src="${imagenUrl}" style="width: 50px; height: auto;"></td>
                                <td>${producto.nombre}</td>
                                <td>${producto.descripcion}</td>
                                <td>${producto.precio} Bs.</td>
                                <td>${producto.talla}</td>
                                <td>${producto.stock}</td>
                                <td>${producto.categoria_nombre}</td>
                                <td>${estadoTexto}</td>
                                <td>
                                    <button type="button" class="btn btn-info" onclick="cargarProducto(${producto.id_producto})"><i class="fas fa-fw fa-edit"></i></button>
                                </td>
                            </tr>`
                        );
                    }
                });
                activarBusqueda()
            } else {
                console.error("Se esperaba un array, pero se recibió:", response.Data);
            }
        
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener los productos: ", status, error);
        }
    });
}



//*****************//
//*** Buscador  ******//
//*****************//

function activarBusqueda() {
    $("#buscar-producto").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#dataTables tbody tr").filter(function() {
            $(this).toggle($(this).find('td:eq(2)').text().toLowerCase().indexOf(value) > -1) 
        });
    });
}

//*****************//
//*** Agregar  ******//
//*****************//

function FormAgregarProducto() {
    var nombre = $('#product-name').val().trim();
    var descripcion = $('#product-description').val().trim();
    var tallas = $('.multiselect-product').val();  
    var talla = tallas ? tallas.join(", ") : '';  
    var stock = $('#product-stock').val().trim();
    var precio = $('#product-precio').val().trim();
    var id_categoriaf = $('#product-category').val();
    var estado_producto = 1;
    var imagen = $('#product-image')[0].files[0]; 

    if (!nombre || !descripcion || !stock || !precio || !talla.length || (!imagen && !$('#product-image-preview').attr('src'))) {
        Mensaje("error", "Completar con todos los campos (obligatorio)");
        return;
    }
    if (stock < 0) {
        Mensaje("error", "El stock no puede ser menor a 0");
        return;
    }
    if(precio <= 0){
        Mensaje("error", "El precio no puede ser 0 o menor");
        return;
    }

    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('talla', talla); 
    formData.append('stock', stock);
    formData.append('estado_producto', estado_producto);
    formData.append('id_categoriaf', id_categoriaf);
    formData.append('imagen', imagen);

    $.ajax({
        url: _urlBackend + "producto/registrarProducto",
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function(response) {
            $('#addProductModal').modal('hide');
            Mensaje("success", "Producto registrado correctamente");
            MostrarProductos();
            limpiarFormAgregar()
        },
        error: function(xhr, status, error) {
            console.error("Error al añadir producto: ", status, error);
        }
    });
}


function agregarCategorias(callback) {
    _urlBackend = getUrlBackend();
    var url = _urlBackend + "categoria/obtenerCategorias";

    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            var select = $('#product-category');
            select.empty();
            if (response.Success && response.Data.length > 0) {
                response.Data.forEach(function(categoria) {
                    select.append(`<option value="${categoria.id_categoria}">${categoria.nombre}</option>`);
                });
                if (callback) callback(); 
            } else {
                console.error("Error al obtener las categorías o respuesta inesperada:", response);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener las categorías: ", status, error);
        }
    });
}

function limpiarFormAgregar(){
    $('#product-name').val("");
    $('#product-description').val("");
    $('.multiselect-product').val("").trigger('change');
    $('#product-stock').val("");
    $('#product-image').val(""); 
}


//*****************//
//*** EDITAR ******//
//*****************//
function cargarProducto(id) {
    var url = _urlBackend + "producto/verProducto/" + id;

    agregarCategoriasEdit(function() {
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
                if (response.Success && response.Data) {
                    var producto = response.Data;
                    $('#product-id').val(producto.id_producto);
                    $('#product-name-edit').val(producto.nombre);
                    $('#product-description-edit').val(producto.descripcion);
                    $('#product-precio-edit').val(producto.precio);
                    $('#product-stock-edit').val(producto.stock);
                    $('#product-category-edit').val(producto.id_categoria);
                    $('#product-image-preview').attr('src', _urlBackend + producto.imagen);
                    var tallasArray = producto.talla.split(", ");
                    $('#product-talla-edit').val(tallasArray).trigger('change');

                    $('#productModal').modal('show');
                } else {
                    console.error("Producto no encontrado o error en la respuesta: ", response);
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al cargar detalles del producto: ", status, error);
            }
        });
    });
}


function agregarCategoriasEdit(callback) {
    _urlBackend = getUrlBackend();
    var url = _urlBackend + "categoria/obtenerCategorias";

    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            var select = $('#product-category-edit');  
            select.empty();
            if (response.Success && response.Data.length > 0) {
                response.Data.forEach(function(categoria) {
                    select.append(`<option value="${categoria.id_categoria}">${categoria.nombre}</option>`);
                });
                if (callback) callback(); 
            } else {
                console.error("Error al obtener las categorías o respuesta inesperada:", response);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener las categorías: ", status, error);
        }
    });
};

function editarProducto(event) {
    event.preventDefault(); 
    var id = $('#product-id').val();
    var nombre = $('#product-name-edit').val().trim();
    var descripcion = $('#product-description-edit').val().trim();
    var precio = $('#product-precio-edit').val().trim();
    var talla = $('#product-talla-edit').val(); 
    var stock = $('#product-stock-edit').val();
    var id_categoriaf = $('#product-category-edit').val();
    var imagen = $('#product-image-edit')[0].files[0];

    // Validaciones de los campos del formulario
    if (!nombre || !descripcion || !stock || !precio || !talla.length || (!imagen && !$('#product-image-preview').attr('src'))) {
        Mensaje("error", "Completar con todos los campos (obligatorio)");
        return;
    }
    
    if (stock < 0) {
        Mensaje("error", "El stock no pueder ser menor a 0");
        return;
    }
    if (precio <= 0) {
        Mensaje("error", "El precio no puede ser menor a 0");
        return;
    }

    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('talla', talla.join(', '));
    formData.append('stock', stock);
    formData.append('id_categoriaf', id_categoriaf);

    // Agregar o no la imagen al FormData según si se seleccionó una nueva
    if (imagen) {
        formData.append('imagen', imagen);
    }

    var url = _urlBackend + "producto/editarProducto/" + id;
    
    $.ajax({
        url: url,
        type: 'PUT',
        contentType: false, 
        processData: false, 
        data: formData,
        success: function(response) {
            if (response.Success) {
                $('#productModal').modal('hide');
                MostrarProductos();
                Mensaje('success', 'Producto actualizado correctamente.');
            } else {
                Mensaje('error', 'Error al actualizar el producto: ' + response.Mensaje);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error al editar el producto: ", status, error);
            Mensaje('error', "Error al editar el producto: " + error);
        }
    });
}

function limpiarImgEditada(){
    $('#product-image-edit').val(""); 

}


//*****************************//
//*** Actualizar Estado ******//
//***************************//


function actualizarEstado(id) {
    _urlBackend = getUrlBackend();
    var url = _urlBackend + "producto/editarEstado/" + id;

    $.ajax({
        url: url,
        type: 'PATCH', 
        success: function(response) {
            if (response.Success) {
                console.log("Estado del producto actualizado correctamente.");
                MostrarProductos(); 
                Mensaje('success','Estado actualizado.'); 
            } else {
                Mensaje('error','Error al actualizar el estado del producto: ' + response.Mensaje);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error al actualizar el estado del producto: ", status, error);
            Mensaje('error',"Error al actualizar el estado del producto: " + error);
        }
    });
}





//toastr */

function Mensaje(tipo, mensaje){

    Command: toastr[tipo](mensaje)

    toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    }
}
