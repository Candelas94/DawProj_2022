
$(document).ready(function () {

    actualizarLikes();

    var nombre = getCookie("usuario");
    var id_usuario = getCookie("id_usuario");

    var nombre = getCookie("usuario");
    if (nombre == null) ocultar();

    var producto = JSON.parse(localStorage.getItem('guitarra'));
    var categorias = JSON.parse(localStorage.getItem('categorias'));
    var lista_likes = JSON.parse(localStorage.getItem('likes'));

    var coincidencia = lista_likes;


    var cat_producto = producto[0].id_categoria;
    var found = categorias.find(element => element.id_categoria == cat_producto);

    var categoria = found.nombre_categoria;
    var marca = producto[0].marca;
    var modelo = producto[0].modelo;
    var precio = producto[0].precio;
    var descripcion = producto[0].descripcion;
    var anyo = producto[0].anyo;
    var estado = producto[0].estado;
    var vendedor = producto[0].nombre_usuario;
    var id_vendedor = producto[0].id_usuario;

    if (vendedor == nombre) {
        $('#boton_chat').css('display', 'none');
        $('.boton_like').css('display', 'none');
        $('.boton_like_off').css('display', 'none');
    }

    coincidencia = coincidencia.filter(x => {
        return x.id_producto === producto[0].id;
    });

    console.log(coincidencia);

    if (coincidencia.length > 0) $('#boton_like').addClass('boton_like');
    else $('#boton_like').addClass('boton_like_off');


    var img_ruta1 = producto[0].fotos[0].img_ruta;
    var img_ruta2 = producto[0].fotos[1].img_ruta;

    $('#img1').attr('src', img_ruta1);
    $('#img2').attr('src', img_ruta2);

    $('#imagen_producto').attr('src', img_ruta1);
    $('#marca_modelo_producto').html(marca +" "+modelo);
    $('#descripcion_producto').html(descripcion);
    $('#precio_producto').html(precio + "€");
    $('#anyo_producto').html(anyo);
    $('#estado_producto').html("Estado: "+estado);
    $('#nombre_categoria').html(categoria);
    $('#vendedor').html(vendedor);

    $('#boton_chat').click(function () {

        var nombre_prod = producto[0].marca + " " + producto[0].modelo;
        var owner = producto[0].id_usuario;
        var interested = id_usuario;
        var id_prod = producto[0].id;

        var chat = { id_owner: owner, id_interested: interested, id_producto: id_prod, nombre_producto: nombre_prod, nombre_vendedor: vendedor };
        localStorage.setItem('chat', JSON.stringify(chat));

        window.location.href = "PantallaMensajes.aspx";

    });

    $('#perfil_vendedor').on('click', function () {

        localStorage.setItem('id_vendedor', JSON.stringify(id_vendedor));
        window.location.href = "PerfilUsuario.aspx";
    });

    $('.boton_like').on('click', function () {

        $(this).removeClass('boton_like');
        $(this).addClass('boton_like_off');

        datoslike = {};
        datoslike.id_producto = producto[0].id;
        datoslike.id_usuario = getCookie("id_usuario");
        datoslike.delete = "yes";

        $.ajax({
            url: 'http://localhost:55174/api/likes/',
            type: 'POST',
            data: JSON.stringify(datoslike),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (respuesta) {

                actualizarLikes();

            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
        });
    });

    $('.boton_like_off').on('click', function () {

        datoslike = {};
        datoslike.id_producto = producto[0].id;
        datoslike.id_usuario = getCookie("id_usuario");
        $(this).removeClass('boton_like_off');
        $(this).addClass('boton_like');

        $.ajax({
            url: 'http://localhost:55174/api/likes/',
            type: 'POST',
            data: JSON.stringify(datoslike),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (respuesta) {

                actualizarLikes();
            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
        });

    });



});
