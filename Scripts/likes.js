$(document).ready(function () {

    var id_usuario = getCookie("id_usuario");    
    var listaguitarras = JSON.parse(localStorage.getItem('lista_guitarras')); // no es el item guitarra, sera el item listaguitarras

    $.ajax({
        url: 'http://localhost:55174/api/likes/' + id_usuario,
        type: 'GET',
        dataType: 'JSON',
        success: function (respuesta) {

            var array_guitarra = listaguitarras;
            var array_coincidencias = [];

            for (var i = 0; i < respuesta.length; i++) {

                var array_guitarra_aux = array_guitarra.filter(x => {
                    return x.id === respuesta[i].id_producto;
                });

                if (array_guitarra_aux.length > 0) array_coincidencias.push(array_guitarra_aux[0]);
            }

            $("#div_principal").children().remove();

            var contador = 1;
            var str = "<div class='row d-flex justify-content-center'>"; // seteo la fila                                   

            for (var x = 0; x < array_coincidencias.length; x++)
            { 
                //console.log(array_guitarra[0].descripcion);

                    var descripcion = array_coincidencias[x].descripcion;
                    var descripcion_format = descripcion.substring(0, 150);

                    var img_ruta = array_coincidencias[x].fotos[0].img_ruta;
                    var imagen = img_ruta.substring(45);

                    console.log(img_ruta);
                    console.log(imagen);

                    str += "<div class='col-md-3'>";

                    str += "<div class='card' style = 'width: 18rem;' >";
                    str += "<img src='" + img_ruta + "' class='card-img-top' alt='imagen del producto' id='imagen_producto'>"; // FOTO PRINCIPAL
                    str += "<div class='card-body'>";
                    str += "<h5 class='card-title'>" + array_coincidencias[x].precio + "€</h5>"; // PRECIO                    
                    str += "<p class='card-text'><h5>" + array_coincidencias[x].marca + " " + array_coincidencias[x].modelo + "</h5><br><p>" + descripcion_format + "</p></p > "; // DATOS CARTA
                    str += "<button class='btn boton_info' id='" + array_coincidencias[x].id + "' >Mas info </button>  </div></div>"; // BOTÓN MÁS INFO + FAVS

                    str += "</div>";

                    contador++; // añado 1 al counter cada vez que añado una guitarra

                    // una vez aquí el código vuelve al principio del for si aun no se ha llenado la fila, y rellena el str con otro elemento del array

                    if (contador == 5 || i == array_coincidencias.length - 1) { // si el contador llega a 5
                        contador = 1; // lo seteo a uno
                        str += "</div>"; // le cierro el div de la FILA
                        str += "<div class='row d-flex justify-content-center'>"; // añado otra cabecera de FILA para que pueda seguir añadiendo elementos debajo
                    }                
                
            }

                $('#div_principal').html(str);

        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });







});
