
$(document).ready(function () {

    $('#formglobal').on('submit', function (e) {
        return false;
    });

    var nombre = getCookie("usuario");
    var id_usuario = getCookie("id_usuario");

    var listaguitarras = JSON.parse(localStorage.getItem('lista_guitarras'));

    $.ajax({
        url: 'http://localhost:55174/api/chats/'+id_usuario,
        type: 'GET',
        dataType: 'JSON',
        success: function (respuesta) {            

            for (var i = 0; i < respuesta.length; i++)
            {
                var id_guitarra = respuesta[i].id_producto;
                var array_guitarra = listaguitarras;

                array_guitarra = array_guitarra.filter(x => {
                    return x.id === id_guitarra;
                });                

                var ruta = array_guitarra[0].fotos[0].img_ruta;

                var imagen = ruta.substring(45);

                console.log(imagen);
                console.log(ruta);

                var nombre_prod = array_guitarra[0].marca + " " + array_guitarra[0].modelo;                

                $('#box_chat').append(" <div nombre_producto='" + nombre_prod + "' owner='" + respuesta[i].id_owner + "' interested='" + respuesta[i].id_interested + "' id_producto='" + respuesta[i].id_producto + "' class='col-md-7 mb-5 chat'><div class='div_img_chat'><img src='" + ruta + "' class='imagen_chat' ></div><div class='texto_chat'><h3>" + nombre_prod + "</h3><p>Tienes "+respuesta[i].noleidos+" mensajes sin leer</p></div></div>");

            }
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });

});

$(document).on('click', '.chat', function () {

    var owner = $(this).attr('owner');
    var interested = $(this).attr('interested');
    var id_prod = $(this).attr('id_producto');
    var nombre_p = $(this).attr('nombre_producto');

    var chat = { id_owner: owner, id_interested: interested, id_producto: id_prod, nombre_producto: nombre_p };
    localStorage.setItem('chat', JSON.stringify(chat));
    window.location.href = 'PantallaMensajes.aspx';

});