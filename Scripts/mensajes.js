

$(document).ready(function () {

    $('#formglobal').on('submit', function (e) {
        return false;
    });

    var nombre = getCookie("usuario");
    var id_usuario = getCookie("id_usuario");

    var datoschat = JSON.parse(localStorage.getItem('chat'));

    var owner = datoschat.id_owner;
    var interested = datoschat.id_interested;
    var product = datoschat.id_producto;
    var nombre_prod = datoschat.nombre_producto;
    var nombre_vendedor = datoschat.nombre_vendedor;

    var datosform = {}
    datosform.id_owner = datoschat.id_owner;
    datosform.id_interested = datoschat.id_interested;
    datosform.id_producto = datoschat.id_producto;
    datosform.sender = nombre;    

    var chat = $.connection.chatHub; //AQUÍ CONECTO CON EL SERVIDOR PARA MANDAR LOS MENSAJES

    chat.client.recibir = function (name, message) { // función del servidor

        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        // Add the message to the page. 
        $('#tablon').append("<li class='other_chat'><div><strong>" + encodedName
            + "</strong>:&nbsp;&nbsp;" + encodedMsg + "</div></li>");
    };

    $('#displayname').val(nombre);
    $('#message').focus();

    $.connection.hub.start().done(function () {
        $('#sendmessage').on('click', function (e) {
            $("#tablon").animate({ "scrollTop": $('#tablon')[0].scrollHeight }, "medium");
            ////Call the Send method on the hub. 
            var grupo = owner + "&" + interested + "&" + product;

            chat.server.conectar(grupo);
            
            var datosmensaje = {};
            datosmensaje.id_interested = interested;
            datosmensaje.id_owner = owner;
            datosmensaje.id_producto = product;
            datosmensaje.mensajes = $('#message').val();
            datosmensaje.sender = nombre;

            $.ajax({
                url: 'http://localhost:55174/api/mensajes/',
                type: 'POST',
                data: JSON.stringify(datosmensaje),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (respuesta) {

                    chat.server.send($('#displayname').val(), datosmensaje.mensajes, owner, interested, product, grupo);

                    $('#tablon').append("<li class='self_chat'><div><strong>" + $('#displayname').val()
                        + "</strong>:&nbsp;&nbsp;" + $('#message').val() + "</div></li>");
                },
                error: function (xhr, status) {
                    alert('Disculpe, existió un problema');
                },
            });

            $('#message').val('').focus();
        });
    });

    // AQUI RELLENO LOS MENSAJES

    $.ajax({
        url: 'http://localhost:55174/api/mensajes/',
        type: 'POST',
        data: JSON.stringify(datosform),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (respuesta) {

            if (respuesta.length != 0) { // si existe el chat
                $("#tablon").animate({ "scrollTop": $('#tablon')[0].scrollHeight }, "medium");

                $('#nombre_producto').html(nombre_prod);

                if (respuesta[0].id_interested == id_usuario) {
                    localStorage.setItem('id_vendedor', JSON.stringify(respuesta[0].id_owner));
                    $('#perfil_vendedor').html("Perfil de " + respuesta[0].nombre_owner);

                } else {
                    localStorage.setItem('id_vendedor', JSON.stringify(respuesta[0].id_interested));
                    $('#perfil_vendedor').html("Perfil de " + respuesta[0].nombre_interested);
                }

                for (var i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].sender == nombre) {
                        $('#tablon').append("<li class='self_chat'><div><strong>" + respuesta[i].sender
                            + "</strong>:&nbsp;&nbsp;" + respuesta[i].mensajes + "</div></li>");
                    } else {
                        $('#tablon').append("<li class='other_chat'><div><strong>" + respuesta[i].sender
                            + "</strong>:&nbsp;&nbsp;" + respuesta[i].mensajes + "</div></li>");
                    }
                }
            } else

            {
                    $('#nombre_producto').html(nombre_prod);
                    localStorage.setItem('id_vendedor', JSON.stringify(owner));
                    $('#perfil_vendedor').html("Perfil de " + nombre_vendedor);
                }           
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });

    $('#perfil_vendedor').on('click', function () {      
        window.location.href = "PerfilUsuario.aspx";
    });



});