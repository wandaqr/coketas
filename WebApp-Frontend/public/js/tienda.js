var _urlBackend;

$(document).ready(function() {
    MostrarProductosTienda();     
});

function MostrarProductosTienda() {
    _urlBackend = getUrlBackend(); // http://localhost:3005/
    var url = _urlBackend + "producto/obtenerProductos";

    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            var contenedorProductos = $('.grid');
            contenedorProductos.empty();
        
            if (Array.isArray(response.Data)) {
                response.Data.forEach(function(producto) {
                    if (producto.estado_producto === 1) { 
                        var imagenUrl = producto.imagen ? _urlBackend + producto.imagen.replace(/\\/g, '/') : 'path/to/default/image.jpg';
                        var productoHTML = `
                        <div class="producto">
                            <a href="ropa.html?id=${producto.id_producto}">
                                <img class="producto__imagen" src="${imagenUrl}" alt="Imagen de ${producto.nombre}">
                                <div class="producto__informacion">
                                    <p class="producto__nombre">${producto.nombre}</p>
                                    <p class="producto__precio">Bs.${producto.precio}</p>
                                </div>
                            </a>
                        </div>
                        `;
                        contenedorProductos.append(productoHTML);
                    }
                });
            } else {
                console.error("Se esperaba un array, pero se recibió:", response.Data);
            }
        
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener los productos: ", status, error);
        }
    });
}



