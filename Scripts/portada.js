
var listaguitarras = [];
var listacategorias = [];
var likes = JSON.parse(localStorage.getItem('likes'));

$(document).ready(function () {

    $('#formglobal').on('submit', function (e) {
        return false;
    })

    obtener();

    function obtener() {
        $.ajax({
            url: 'http://localhost:55174/api/guitarra/',
            type: 'GET',
            dataType: 'JSON',
            success: function (respuesta) {                
                
                for (var i = 0; i < respuesta.listacategorias.length; i++) {

                    listacategorias.push(respuesta.listacategorias[i]); // relleno el array de categorías
                }    

                for (var i = 0; i < respuesta.listaguitarras.length; i++) {
                    
                    listaguitarras.push(respuesta.listaguitarras[i]); //relleno el array de los productos                    
                }
                // guardo en localStore la lista de cats
                localStorage.setItem('categorias', JSON.stringify(listacategorias)); 
                //dibujo los productos con la función creada de pintarguitarras
                pintaguitarras(listaguitarras);

                // oculto los botones de like de la portada con la función ocultar() del commons.js
                var nombre = getCookie("usuario");
                if (nombre == null) ocultar();

                pintaroptions(listacategorias);

                localStorage.setItem('lista_guitarras', JSON.stringify(listaguitarras));
                // recojo lo que se haya podido buscar que provenga de otras vistas, del localstore
                var busqueda = localStorage.getItem('busqueda');

                if (busqueda != null) {

                    $('#input_buscador_general').val(busqueda);
                    buscar();
                }                
            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
        });
    }

    function pintaroptions(lista) {        

        for (var i = 0; i < lista.length; i++) {

            $('#filtro_categorias').append("<input type='radio' id='" + lista[i].id_categoria + "' name='filtro_categorias' value='" + lista[i].id_categoria + "' ><label for='" + lista[i].id_categoria + "'>" + lista[i].nombre_categoria + "</label><br>");            
        }
    }    
    
    function pintaguitarras(lista) {

        $("#div_principal").children().remove();

        var contador = 1;
        var str = "<div class='row d-flex justify-content-center'>"; // seteo la fila

        for (var i = 0; i < lista.length; i++) {

            var descripcion = lista[i].descripcion;
            var descripcion_format = descripcion.substring(0, 150);

            var img_ruta = lista[i].fotos[0].img_ruta;

            
            var array_likes = likes;

            array_likes = array_likes.filter(x => {
                return x.id_producto === lista[i].id;
            });

            var id_user = getCookie("id_usuario");

            str += "<div class='col-md-3'>";

            str += "<div class='card' style = 'width: 18rem;' >";
            str += "<img src='" + img_ruta + "' class='card-img-top' alt='imagen del producto' id='imagen_producto'>"; // FOTO PRINCIPAL
            str += "<div class='card-body'>";

            if (lista[i].id_usuario == id_user) str += "<h5 class='card-title'>" + lista[i].precio + "€ </h5>"; // PRECIO

            else if (array_likes.length < 1) str += "<h5 class='card-title'>" + lista[i].precio + "€ <button id_prod='" + lista[i].id + "' class='btn float-right boton_like_off'><i class='fa-regular fa-heart'></i></button></h5>";
            else str += "<h5 class='card-title'>" + lista[i].precio + "€ <button id_prod='" + lista[i].id + "' class='btn float-right boton_like'><i class='fa-regular fa-heart'></i></button></h5>"; // PRECIO
            
            str += "<p class='card-text'><h5>" + lista[i].marca + " " + lista[i].modelo + "</h5><br><p>" + descripcion_format + "</p></p > "; // DATOS CARTA
            str += "<button class='btn boton_info' id='" + lista[i].id + "' >Mas info</button>  </div></div>"; // BOTÓN MÁS INFO + FAVS

            str += "</div>";

            contador++; // añado 1 al counter cada vez que añado una guitarra

            // una vez aquí el código vuelve al principio del for si aun no se ha llenado la fila, y rellena el str con otro elemento del array

            if (contador == 5 || i == lista.length - 1) { // si el contador llega a 5
                contador = 1; // lo seteo a uno
                str += "</div>"; // le cierro el div de la FILA
                str += "<div class='row d-flex justify-content-center'>"; // añado otra cabecera de FILA para que pueda seguir añadiendo elementos debajo
            }
        }

        $('#div_principal').html(str);

    }


    $('#buscar').on('click', function () {
        buscar();        
    });

    $('#input_buscador_general').on('keyup', function (e) {
        //($(this).val().length > 3)       
        if (e.which == 13) {
            buscar();                        
        }

        if ($('#input_buscador_general').val().length == 0) {
            pintaguitarras(listaguitarras);
        }

    });

    function buscar()
    {               
        //var busqueda = $('#input_buscador_general').val();
        var coincidencias = listaguitarras;

        if ($('#input_buscador_general').val() != "") {
            coincidencias = coincidencias.filter(x => {            
                return x.marca.toLowerCase().indexOf($('#input_buscador_general').val().toLowerCase()) > -1 || x.modelo.toLowerCase().indexOf($('#input_buscador_general').val().toLowerCase()) > -1;
            });
        } 

        if ($("input:radio[name=filtro_categorias]:checked").val() > 0) {

            var id_cat = parseInt($("input:radio[name=filtro_categorias]:checked").val());

            coincidencias = coincidencias.filter(x => {
                 return x.id_categoria === id_cat;
            });
        }

        if ($('#precio_min').val() != 0) {
            coincidencias = coincidencias.filter(x => {
                return x.precio >= ($('#precio_min').val());
            });
        }

        if ($('#precio_max').val() != 0) {
            coincidencias = coincidencias.filter(x => {
                return x.precio <= ($('#precio_max').val());
            });
        }

        console.log($(coincidencias));
        pintaguitarras(coincidencias);
        localStorage.removeItem('busqueda');
    }

    $('#apply_filters').on('click', function () {
        buscar();
    });

    $('#restart_filters').on('click', function () {

        $('#input_buscador_general').val("");
        $("input:radio[name=filtro_categorias]:checked").prop('checked', false);
        $('#precio_min').val("");
        $('#precio_max').val("");

        
        pintaguitarras(listaguitarras);
    });

    var win = $(window); //this = window

    if (win.width() <= 1280) {
        $('#boton_categorias').show();
        $('#sticky-sidebar').hide();
        $('#filtros_movil').append($('#sticky-sidebar').children());

        $('#boton_categorias').click(function () {
            
            $('#filtros_movil').toggle();
        });

    } else {
        $('#boton_categorias').hide();
        $('#sticky-sidebar').show();
    }    

});

$(document).on('click', '.boton_info', function () {

    var id_guitarra = $(this).attr('id');
    var id_parseada = parseInt(id_guitarra);
    var array_guitarra = listaguitarras;

    array_guitarra = array_guitarra.filter(x => {
        return x.id === id_parseada;
    });

    localStorage.setItem('guitarra', JSON.stringify(array_guitarra));    
    window.location.href = 'Producto.aspx';
});

$(document).on('click', '.boton_like_off', function () {

    datoslike = {};
    datoslike.id_producto = $(this).attr('id_prod');
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

            console.log(likes);

            actualizarLikes();

            console.log(likes);

        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
});

console.log(likes);

$(document).on('click', '.boton_like', function () {

    $(this).removeClass('boton_like');
    $(this).addClass('boton_like_off');

    datoslike = {};
    datoslike.id_producto = $(this).attr('id_prod');
    datoslike.id_usuario = getCookie("id_usuario");
    datoslike.delete = "yes";

    $.ajax({
        url: 'http://localhost:55174/api/likes/',
        type: 'POST',
        data: JSON.stringify(datoslike),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (respuesta) {

            console.log(likes);

            actualizarLikes();

            console.log(likes);

        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
});


$(window).on('resize', function () {
    
});
