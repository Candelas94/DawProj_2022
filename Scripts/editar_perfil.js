
$(document).ready(function () {
       

    var nombre = getCookie("usuario");
    var id_user = getCookie('id_usuario');

    $.ajax({
        url: "http://localhost:55174/api/users/" + id_user,
        type: 'GET',
        dataType: 'JSON',
        success: function (respuesta) {
            console.log(respuesta);

            $('#nombre').val(respuesta[0].UserName);
            $('#mail').val(respuesta[0].Email);            
            $('#telefono').val(respuesta[0].PhoneNumber);
            $('#ciudad').val(respuesta[0].Ciudad);
            $('#cod_postal').val(respuesta[0].Cod_postal);            
        }
    });

    $('#form_perfil').on('submit', function () {

        return false;
    });

    $('#guardar_perfil').on('click', function () {

        var mailedit = $('#mail').val();
        var nombreedit = $('#nombre').val();
        var ciudadedit = $('#ciudad').val();
        var postaledit = $('#cod_postal').val();
        var numeroedit = $('#telefono').val();
        var passedit = $('#pass').val();

        if (passedit != $('#pass2').val()) {
            $('#pass_incorrecta').dialog();
        }
        else {

            var datosform = {};

            var id = getCookie("id_usuario");

            datosform.Email = mailedit;
            datosform.PhoneNumber = numeroedit;
            datosform.UserName = nombreedit;
            datosform.Ciudad = ciudadedit;
            datosform.Cod_postal = postaledit;
            datosform.PasswordHash = passedit;
            datosform.rolCambio = "";

            $.ajax({
                url: 'http://localhost:55174/api/users/' + id,
                type: 'PUT',
                data: JSON.stringify(datosform),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (json) {
                
                    //console.log(datosform.PasswordHash)               

                    window.location.href = 'Perfil.aspx';
                   
                },
                error: function (xhr, status) {
                    alert('Disculpe, existió un problema');
                },
            });

        }

    });




});
