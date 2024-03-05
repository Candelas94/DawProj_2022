
let upload = false; // //////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

    var nombre = getCookie("usuario");
    var id_user = getCookie('id_usuario');

    var listacategorias = [];

    listacategorias = JSON.parse(localStorage.getItem('categorias'));

    //relleno los option con la lista de las categorías:

    for (var i = 0; i < listacategorias.length; i++) {
        $("#optionscategorias").append("<option value='" + listacategorias[i].id_categoria + "'>" + listacategorias[i].nombre_categoria + "</option>");
    }

    $('#formulario_foto').on('submit', function () {

        var formData = new FormData($(this)[0]); // creamos el formdata donde le pasaremos los archivos

        $.ajax({
            url: '/Controlador/Subir_foto.ashx', // en el servidor vamos al controlador para recoger los archivos
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {

                window.location.href = 'Perfil.aspx';

            }
        });

        return false;
    });

});