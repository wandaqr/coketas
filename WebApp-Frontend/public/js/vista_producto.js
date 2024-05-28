const botonMenos = document.getElementById("btn-menos");
const botonMas = document.getElementById("btn-mas");
const cantidadDisplay = document.getElementById("cantidad-total");
let cantidadTotal = 1; 


botonMenos.addEventListener("click", () => {
    if (cantidadTotal > 1) {  
        cantidadTotal -= 1; 
        cantidadDisplay.textContent = cantidadTotal;  
    }
});

botonMas.addEventListener("click", () => {
    cantidadTotal += 1;  
    cantidadDisplay.textContent = cantidadTotal;  

});


document.querySelectorAll('.custom-radio input').forEach(radio => {
    radio.addEventListener('change', function() {
        // Elimina la clase 'selected' de todos los radios
        document.querySelectorAll('.custom-radio').forEach(radio => {
            radio.classList.remove('selected');
        });

        // Añade la clase 'selected' solo al radio seleccionado
        if (this.checked) {
            this.parentElement.classList.add('selected');
            
        }
    });
});

/* Rescatar id */
const params = new URLSearchParams(window.location.search);
const productoId = params.get('id');
if (productoId) {
    MostrarUnProducto(productoId);
}

function MostrarUnProducto(id) {
    _urlBackend = getUrlBackend(); // http://localhost:3005/
    var url = _urlBackend + "producto/verProducto/" + id;

    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            if (response.Success && response.Data) {
                const producto = response.Data;
                document.querySelector('.camisa__imagen').src = _urlBackend + producto.imagen.replace(/\\/g, '/');
                document.querySelector('.producto__nombre').textContent = producto.nombre;
                document.querySelector('.producto__descripcion').textContent = producto.descripcion;
                document.querySelector('.producto__precio').textContent = `Bs.${producto.precio}`;

                const tallas = producto.talla.split(', ');
                const tallasContainer = document.querySelector('.radio-talla'); // Asegúrate de que el selector sea correcto
                tallasContainer.innerHTML = ''; // Limpiar tallas existentes

                tallas.forEach((talla, index) => {
                    const checked = index === 0 ? 'checked' : '';
                    tallasContainer.innerHTML += `
                        <label class="custom-radio">
                            ${talla}
                            <input type="radio" name="talla" value="${talla}" ${checked}>
                            <span class="checkmark"></span>
                        </label>
                    `;
                });

                // Añadir evento después de crear los radios
                document.querySelectorAll('.custom-radio input').forEach(radio => {
                    radio.addEventListener('change', function() {
                        document.querySelectorAll('.custom-radio').forEach(radio => {
                            radio.classList.remove('selected');
                        });
                        if (this.checked) {
                            this.parentElement.classList.add('selected');
                        }
                    });
                });

                // Selecciona la primera talla por defecto
                if (tallas.length > 0) {
                    document.querySelectorAll('.custom-radio input')[0].parentElement.classList.add('selected');
                }

            } else {
                console.error("Producto no encontrado o error en la respuesta:", response);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener detalles del producto: ", status, error);
        }
    });
}
