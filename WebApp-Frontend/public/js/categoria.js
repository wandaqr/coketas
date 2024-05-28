var _urlBackend


$(document).ready(function() {
    MostrarCategorias();  
});


//*******************************//
//****** Mostrar Tabla  ******//
//*****************************//

function MostrarCategorias() {
    _urlBackend = getUrlBackend(); // http://localhost:3005/
    console.log(_urlBackend);
    var url = _urlBackend + "categoria/obtenerCategorias";

    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            var tbody = $('#dataTables tbody');
            tbody.empty();
        
            if (Array.isArray(response.Data)) {
                response.Data.forEach(function(categoria, index) {
                    tbody.append(
                        `<tr>
                            <td>${index + 1}</td>
                            <td>${categoria.nombre}</td>
                            <td>
                                <button type="button" onclick="cargarIdEliminar(${categoria.id_categoria})" data-toggle="modal" data-target="#categoriaModalEliminar" class="btn btn-danger"><i class="fas fa-fw fa-trash"></i></button>
                            </td>
                            <td>
                                <button type="button" onclick="cargarCategoria(${categoria.id_categoria})" class="btn btn-info" data-toggle="modal" data-target="#categoriaModal"><i class="fas fa-fw fa-edit"></i></button>
                            </td>
                        </tr>`
                    );
                });
                //activarBusqueda();
            } else {
                console.error("Se esperaba un array, pero se recibió:", response.Data);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener las categorias: ", status, error);
        }
    });
}


//*******************************//
//****** Agregar Categoria  ******//
//*****************************//


function FormCategoria(){
    _urlBackend = getUrlBackend();
    var url = _urlBackend + "categoria/agregarCategorias"

    var nombre = $('#categoria-name').val().trim();
    var estado_categoria = 1;
    var contError = 0;
    
    if(nombre == ""){
        Mensaje("error","Campo vacío");
        return;
    }

    var data = {
        nombre:nombre,
        estado_categoria:estado_categoria

    };
    
    if(contError == 0){
        $.ajax({
            url: url, 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                $('#addCategoriaModal').modal('hide');
                Mensaje("success", "Se regitró una categoria")
                MostrarCategorias(); 
            },
            error: function(xhr, status, error) {
                console.error("Error al añadir la categoria: ", status, error);
            }
        });
    }
    

    

}


//*****************//
//*** EDITAR ******//
//*****************//


function cargarCategoria(id_categoria) {
    //console.log('Cargando categoría para editar:', id_categoria);
    _urlBackend = getUrlBackend();
    var url = _urlBackend + "categoria/obtenerCategoriaID/" + id_categoria; 

    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            if (response.Success && response.Data) {
                var categoria = response.Data;
               
                $('#categoria-id-edit').val(categoria.id_categoria); 
                $('#categoria-name-edit').val(categoria.nombre); 

          
                $('#categoriaModal').modal('show');
            } else {
                console.error("Categoría no encontrada o error en la respuesta:", response);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error al cargar detalles de la categoría:", status, error);
        }
    });
    
}

function EditarCategoria() {
    _urlBackend = getUrlBackend();
    var id_categoria = $('#categoria-id-edit').val();
    var nombre_categoria = $('#categoria-name-edit').val();
    var url = _urlBackend + "categoria/editarCategoria/" + id_categoria;

    $.ajax({
        url: url,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ nombre: nombre_categoria }),
        success: function(response) {
            if(response.Success) {
                $('#categoriaModal').modal('hide'); 
                Mensaje('success','Categoría actualizada correctamente.');
                MostrarCategorias()
            } else {
                Mensaje('error','La categoria ya esta en uso en algun producto');
            }
        },
        error: function(xhr, status, error) {
            
            if(xhr.status === 400) {
                Mensaje('error','El nombre de la categoría ya está en uso. Por favor, elija otro nombre.');
            } else {
                console.error("Error al actualizar la categoría: ", status, error);
                Mensaje('error','Error al actualizar la categoría: ' + xhr.responseText);
            }
        }
    });
}


//*****************//
//*** Eliminar ******//
//*****************//

function cargarIdEliminar(id_categoria){
    $('#categoria-id-delete').val(id_categoria);
}

function eliminarCategoria(){
    var id_categoria = $('#categoria-id-delete').val();

    //console.log("listo para eliminar id:", id_categoria);
    _urlBackend = getUrlBackend();
    var url = _urlBackend + "categoria/eliminarCategoria/" + id_categoria;

    $.ajax({
        url: url,
        type: 'DELETE', 
        success: function(response) {
            if (response.Success) {
                MostrarCategorias(); 
                Mensaje('success','Se eliminó correctamente.'); 
                $('#categoriaModalEliminar').modal('hide');
            } else {
                Mensaje('error','La categoria ya esta en uso en algún producto');
            }
        },
        error: function(xhr, status, error) {
            //console.error("Error al actualizar el estado del producto: ", status, error);
            Mensaje('error',"La categoria ya esta en uso en algún producto");
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
