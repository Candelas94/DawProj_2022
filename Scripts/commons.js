

function getCookie(name) {

    var cookieArr = document.cookie.split(";");

    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0].trim()) {

            return decodeURIComponent(cookiePair[1]);
        }
    }
    // Return null if not found
    return null;
};

    var nombre = getCookie("usuario");
    var id_usuario = getCookie("id_usuario");
    var lista_likes = [];

$(document).ready(function () {

    actualizarLikes();
       
    if (nombre != null)
    {
        $('#link_login').hide();
        $('#link_perfil').show();
        $('#boton_perfil').append(" "+nombre);
        $('#link_subir').show();
        $('#Logout').show();
        $('#Logout').css("display", "inline-block");
        $('#mis_mensajes').show();
       
    }

    var lista_likes = JSON.parse(localStorage.getItem('likes'));

    var producto = JSON.parse(localStorage.getItem('guitarra'));

    var coincidencia = lista_likes;

    coincidencia = coincidencia.filter(x => {
        return x.id_producto === producto[0].id;
    });

    if (coincidencia.length > 0) $('#boton_like').addClass('boton_like');
    else $('#boton_like').addClass('boton_like_off');

    $('#mis_mensajes').on('click', function () {
    window.location.href = "PantallaMensajesUsuario.aspx";
    });

    $('#Logout').on('submit', function () {
        $.ajax({
            url: '/api/logout/',
            type: 'GET',
            async: false,
            cache: false,
            success: function (response) {
                window.location.replace("Login.aspx");
            }
        });
        return false;
    });

    $.ajax({
        url: 'http://localhost:55174/api/chats/' + id_usuario,
        type: 'GET',
        dataType: 'JSON',
        success: function (respuesta) {
            var mensajes = 0;
            for (var i = 0; i < respuesta.length; i++) {
                if (respuesta[i].noleidos > 0) mensajes++;
            }
            $('#mis_mensajes').append(" "+mensajes);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });

    $('#input_buscador_general').on('keyup', function (e) {     
        if (e.which == 13) {

            if (window.location != 'http://localhost:55174/Portada')
            {
                var busqueda = $('#input_buscador_general').val();
                localStorage.setItem('busqueda', busqueda);
                window.location.href = "Portada.aspx";
            }
        }
    });
});

function actualizarLikes() {

    $.ajax({
        url: 'http://localhost:55174/api/likes/' + id_usuario,
        type: 'GET',
        dataType: 'JSON',
        success: function (respuesta) {

                localStorage.removeItem('likes');
                lista_likes.length = 0;

            for (var i = 0; i < respuesta.length; i++) {

                lista_likes.push(respuesta[i]);
            }

            localStorage.setItem('likes', JSON.stringify(lista_likes));

        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}

function ocultar() {

$('.boton_like').css('display', 'none');
    $('.boton_like_off').css('display', 'none');
    $('#boton_chat').css('display', 'none');
}

