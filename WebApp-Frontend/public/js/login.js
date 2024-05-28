var _urlBackend

function form_admin(event) {
    event.preventDefault();

    var email = $('#email').val(); 
    var pass = $('#pass').val();   

    loguear_admin(email, pass);
}

function loguear_admin(email, pass) {
    _urlBackend = getUrlBackend(); // http://localhost:3005/
    var url = _urlBackend + "login/administrador";

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email: email, pass: pass }),
        success: function(response) {
            if (response.success) {
                window.location.href = 'dashboard.html'; 
            } else {
                errorMensaje("Error Acceso no válido");
            }
        },
        error: function(xhr, status, error) {
            errorMensaje("Error Acceso no válido");
        }
    });
}


function errorMensaje(mensaje){

    Command: toastr["error"](mensaje)

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


