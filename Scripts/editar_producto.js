
$(document).ready(function () {

    var listacategorias = [];
    listacategorias = JSON.parse(localStorage.getItem('categorias'));
    console.log(listacategorias);
    for (var i = 0; i < listacategorias.length; i++) {
        $("#optionscategorias").append("<option value='" + listacategorias[i].id_categoria + "'>" + listacategorias[i].nombre_categoria + "</option>");
    }


    var nombre = getCookie("usuario");

    var producto = JSON.parse(localStorage.getItem('guitarra'));
    //console.log(producto);
    var marca = producto[0].marca;
    var modelo = producto[0].modelo;
    var precio = producto[0].precio;
    var descripcion = producto[0].descripcion;
    var anyo = producto[0].anyo;
    var categoria = producto[0].id_categoria;
    var estado = producto[0].estado;

    $('#marca_producto').val(marca);
    $('#modelo_producto').val(modelo);
    $('#descripcion_producto').val(descripcion);
    $('#precio_producto').val(precio);
    $('#anyo_producto').val(anyo);
    $('#estado_product').val(estado);
    $("#optionscategorias option[value=" + categoria + "]").prop('selected', true).change(); // AQUI LE PONGO EL VALUE DEL OPTION CON LA CATEGORÍA A LA QUE LE CORRES

    $('#form_producto').on('submit', function () {
        return false;
    });

    $('#abrir_fotos').on('click', function () {

        $('#modal_subir').removeClass('oculto');
        $('#modal_subir').addClass('visible');
    });

    $('#cerrar_modal').click(function () {
        $('#modal_subir').removeClass('visible');
        $('#modal_subir').addClass('oculto');
    });

    $('#formulario_foto').on('submit', function () {
        return false;

    });

    $('#guardar_producto').on('click', function () {

        var marcaedit = $('#marca_producto').val(); // AQUI RELLENO EL DATAFORM PARA LA LLAMADA AJAX CON LOS VALORES DE LAS VARIABLES GLOBALES
        var modeloedit = $('#modelo_producto').val();
        var anyoedit = $('#anyo_producto').val();
        var precioedit = $('#precio_producto').val().replace("€", "");
        var descripcionedit = $('#descripcion_producto').val();
        var estadoedit = $('#estado_product').val();
        var categoriaedit = $('#optionscategorias').val();

        datosform = {};
        datosform.marca = marcaedit;
        datosform.modelo = modeloedit;
        datosform.anyo = anyoedit;
        datosform.categoria = categoriaedit;
        datosform.precio = precioedit;
        datosform.descripcion = descripcionedit;
        datosform.estado = estadoedit;

        var id = producto[0].id;

        $.ajax({
            url: 'http://localhost:55174/api/guitarra/' + id,
            type: 'PUT',
            data: JSON.stringify(datosform),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (json) {               
                //console.log(datosform);

                window.location.href = 'Perfil.aspx';

            },
            error: function (xhr, status) {

                //console.log(status);
                alert('Disculpe, existió un problema');
            },
        });



    });


    $('#Logout').on('submit', function () {


        $.ajax({
            url: 'http://localhost:55174/api/logout/', // en el servidor vamos al controlador para recoger los archivos
            type: 'GET',
            async: false,
            cache: false,
            success: function (response) {


                window.location.replace("Login.aspx");

            }
        });
        return false;

    });

});