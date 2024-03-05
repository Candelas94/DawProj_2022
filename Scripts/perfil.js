$(document).ready(function () {

    var nombre = getCookie("usuario");

    mostrar();

    function mostrar() {

        var id_user = getCookie('id_usuario');

        $.ajax({
            url: "http://localhost:55174/api/users/" + id_user,
            type: 'GET',
            dataType: 'JSON',
            success: function (respuesta) {

                //console.log(respuesta);

                $("#div_principal").children().remove();

                var contador = 1;
                var str = "<div class='row d-flex justify-content-center'>"; // seteo la fila

                for (var i = 0; i < respuesta[0].listaProductos.length; i++) {
                    //console.log(contador);

                    //str += "<div class='col-md-3'><img class='img-thumbnail' src='img/guitarra.png'><br><h3>" + respuesta[0].listaProductos[i].precio + "€<h4>" + respuesta[0].listaProductos[i].marca + " " + respuesta[0].listaProductos[i].modelo + "</h4><br><p>" + respuesta[0].listaProductos[i].descripcion + "</p></div>";

                    var descripcion = respuesta[0].listaProductos[i].descripcion;
                    var descripcion_format = descripcion.substring(0, 150);


                    //var img_ruta = respuesta.listaProductos[i].fotos[0].img_ruta;
                    //var imagen = img_ruta.substring(37);
                    var img_ruta = respuesta[0].listaProductos[i].fotos[0].img_ruta;
                    var imagen = img_ruta.substring(45);
                    console.log(img_ruta);

                    str += "<div class='col-md-3'>";

                    str += "<div class='card' style = 'width: 18rem;' >";
                    str += "<img src='" + img_ruta+"' class='card-img-top' alt='imagen del producto' id='imagen_producto'>"; // FOTO PRINCIPAL
                    str += "<div class='card-body'>";
                    str += "<h5 class='card-title'>" + respuesta[0].listaProductos[i].precio + "€</h5>"; // PRECIO
                    str += "<p class='card-text'><h5>" + respuesta[0].listaProductos[i].marca + " " + respuesta[0].listaProductos[i].modelo + "</h5><br><p>" + descripcion_format + "</p></p > "; // DATOS CARTA
                    str += "<button class='btn boton_info' id='" + respuesta[0].listaProductos[i].id + "' >Mas info / Editar</button> <button id_prod='" + respuesta[0].listaProductos[i].id +"' id='boton_delete' class='btn'><i class='fa-solid fa-trash-can'></i></button> </div></div>"; // BOTÓN MÁS INFO + FAVS

                    str += "</div>";


                    contador++; // añado 1 al counter cada vez que añado una guitarra

                    // una vez aquí el código vuelve al principio del for si aun no se ha llenado la fila, y rellena el str con otro elemento del array

                    if (contador == 5 || i == respuesta[0].listaProductos.length - 1) { // si el contador llega a 5
                        contador = 1; // lo seteo a uno
                        str += "</div>"; // le cierro el div de la FILA
                        str += "<div class='row d-flex justify-content-center'>"; // añado otra cabecera de FILA para que pueda seguir añadiendo elementos debajo
                    }
                }

                $('#div_principal').html(str); // cuando se han recorrido todos los elementos meto el html dentro

                for (var i = 0; i < respuesta[0].listaProductos.length; i++) {

                    listaguitarras.push(respuesta[0].listaProductos[i]);

                }

                //for (var i = 0; i < respuesta[0].listacategorias.length; i++) {

                //    listacategorias.push(respuesta[0].listacategorias[i]);
                //}

                //for (var i = 0; i < respuesta[0].listaProductos.length; i++) {

                //    listaProductos.push(respuesta[0].listaProductos[i]);
                //}

            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
        });
    }

    $('#editar_perfil').on('click', function () {

        window.location.href = 'EditarPerfil.aspx';

    });

    $('#favoritos').on('click', function () {

        window.location.href = "PantallaLikes.aspx";

    });

});

var listaguitarras = [];

$(document).on('click', '#boton_delete', function () {

    var id = $(this).attr('id_prod');
    console.log(id);

    $.ajax({
        url: 'http://localhost:55174/api/guitarra/' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function (json) {

            //alert('Eliminado correctamente');
            window.location.reload();

        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });

});


$(document).on('click', '.boton_info', function () {

    var id_guitarra = $(this).attr('id');
    var id_parseada = parseInt(id_guitarra);
    var array_guitarra = listaguitarras;

    array_guitarra = array_guitarra.filter(x => {
        return x.id === id_parseada;
    });

    console.log(array_guitarra);

    localStorage.setItem('guitarra', JSON.stringify(array_guitarra));
    window.location.href = 'EditarProducto.aspx';
});