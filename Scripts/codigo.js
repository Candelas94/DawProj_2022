function togglePassword(el, id) {

    // Checked State
    var checked = el.checked;

    if (checked) {
        // Changing type attribute
        document.getElementById(id).type = 'text';
    } else {
        // Changing type attribute
        document.getElementById(id).type = 'password';
    }
}

$(document).on('click', '.foto', function () {

    var id = $(this).closest('tr').attr('id');
    $('#id_producto_foto').val(id);
    $('#modal_subir').removeClass('oculto');
    $('#modal_subir').addClass('visible');
});

let upload = false;

$(document).ready(function () {

    // PANEL USUARIOS
      
    get_usuarios();
    var array_usuarios = [];

    var id_usuario; // FILA 1, AÑADO A LA MARCA DECLARADA FUERA EL TEXTCONTENT DE LA CELDA SELECCIONADA
    var nombre_usuario;
    var email;
    var numero_usuario;
    var ciudad;
    var cod_postal;
    var password;
    var tabla_usuarios;
    var rol;

    function get_usuarios() {
        $.ajax({
            url: 'http://localhost:55174/api/users/',
            type: 'GET',
            dataType: 'JSON',
            success: function (respuesta) {

                //console.log("respuesta", respuesta);

                for (var i = 0; i < respuesta.length; i++) {

                    array_usuarios.push(respuesta[i]);
                    
                }

                pintarUsuarios(respuesta);
                
            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
        });

    }

    function pintarUsuarios(array) {

        tabla_usuarios = $('#tabla_usuarios').DataTable({
            data: array,
            rowId: "Id", // con esto le pongo el id a la fila con el número de usuario
            columns: [
                
                { title: "ID" , data: "Id"},
                { title: "NOMBRE", data: "UserName" },
                { title: "E-MAIL", data: "Email" },
                { title: "NUMERO", data: "PhoneNumber"},
                { title: "CIUDAD", data: "Ciudad"},
                { title: "CÓDIGO POSTAL", data: "Cod_postal" },
                { title: "ADMIN", data: "rol" },

                {
                    defaultContent: '<input type="button" class="cambiar_rol" value="CAMBIAR ROL"/>'
                }
            ],
            buttons:['BORRAR']
        });
    }    

    $(document).on('click',  '#tabla_usuarios tbody tr', function () {

        id = $(this).attr('id');

        $(this).addClass('clickUser');
        $(this).siblings().removeClass('clickUser'); // le quito esta clase a sus bros
        $('#boton_editar').show();

        id_usuario = $(this).children()[0].textContent; // FILA 1, AÑADO A LA MARCA DECLARADA FUERA EL TEXTCONTENT DE LA CELDA SELECCIONADA
        nombre_usuario = $(this).children()[1].textContent;
        email = $(this).children()[2].textContent;
        numero_usuario = $(this).children()[3].textContent;
        ciudad = $(this).children()[4].textContent;
        cod_postal = $(this).children()[5].textContent;
        rol = $(this).children()[6].textContent;

    });

    $(document).on("click", ".clickUser", function () { // HACER CLICK SOBRE ALGO YA CLICADO

        $(this).removeClass('clickUser');
        $('#boton_editar').hide();

    }); 

    $('#boton_insertar').on('click', function () {

        $('#nuevo_usuario').dialog();
    })

    $('#boton_editar').on('click', function () {

        $('#edit_id_usuario').val(id_usuario);
        $('#edit_nombre_usuario').val(nombre_usuario);
        $('#edit_mail_usuario').val(email);
        $('#edit_numero_usuario').val(numero_usuario);
        $('#edit_ciudad_usuario').val(ciudad);
        $('#edit_cod_postal_usuario').val(cod_postal);

        $('#actualizar_usuario').dialog(); // LUEGO MUESTRO EL DIÁLOGO DEL USUARIO
    })  

/*  ////////////////////////////// LLAMADAS AJAX USUARIOS /////////////////// */

    $('#borrar_usuario').on('click', function () {

        $(function () 
        {
            $("#confirmar-borrar").dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Borrar elemento": function () {
                       
                        $.ajax({
                            url: 'http://localhost:55174/api/users/' + id_usuario,
                            type: 'DELETE',
                            dataType: 'json',
                            success: function (json) {

                                //console.log(json);
                                $("#dialogo-correcto").children().remove();
                                $("#dialogo-correcto").append("<p>Borrado con éxito</p>"); // PINTO LA RESPUESTA DEL JSON EN EL CUADRO DIÁLOGO

                                $(function () { // FUNCION PARA MOSTRAR EL DIÁLOGO
                                    $("#dialogo-correcto").dialog(
                                        {
                                            modal: true,
                                            buttons: {
                                                Ok: function () {                                                     

                                                    tabla_usuarios.row($('#' + id)).remove().draw(); 
                                                    
                                                    $(this).dialog("close");
                                                }
                                            }
                                        });
                                });                                                             

                            },
                            error: function (xhr, status) {
                                alert('Disculpe, existió un problema');
                            },
                        });

                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });

        });
    });

    $('#insertar_usuario').on('click', function () {

        var mailinsert = $('#new_mail_usuario').val();
        var nombreinsert = $('#new_nombre_usuario').val();
        var ciudadinsert = $('#new_ciudad_usuario').val(); 
        var postalinsert = $('#new_cod_postal_usuario').val(); 
        var numeroinsert = $('#new_numero_usuario').val(); 
        var passinsert = $('#new_pass').val();

        if ($('#new_pass_confirm').val() == $('#new_pass').val())
        {
            var datosform = {};

            datosform.Email = mailinsert;
            datosform.PhoneNumber = numeroinsert;
            datosform.UserName = nombreinsert;
            datosform.Ciudad = ciudadinsert;
            datosform.Cod_postal = postalinsert;
            datosform.PasswordHash = passinsert;
            console.log(datosform);

            $("#confirmar-insertar").dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Introducir": function () {

                        try {
                            $.ajax({
                                url: 'http://localhost:55174/api/users/',
                                type: 'POST',
                                data: JSON.stringify(datosform),
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                success: function (json) {

                                    //console.log(json);

                                    $("#dialogo-correcto").children().remove();
                                    $("#dialogo-correcto").append("<p>USUARIO INTRODUCIDO CORRECTAMENTE</p>");

                                    var noderow = tabla_usuarios.row.add({
                                        "Id": json,
                                        "UserName": datosform.UserName,
                                        "Email": datosform.Email,
                                        "PhoneNumber": datosform.PhoneNumber,
                                        "Ciudad": datosform.Ciudad,
                                        "Cod_postal": datosform.Cod_postal,
                                        "rol": "2"

                                    }).draw(false);
                                    noderow.nodes().to$().attr('id', json);
                                    tabla_usuarios.draw();


                                    $(function () {
                                        $("#dialogo-correcto").dialog(
                                            {
                                                modal: true,
                                                buttons: {
                                                    Ok: function () {                                                                                                               
                                                        $(this).dialog("close");
                                                    }
                                                }
                                            }
                                        );
                                    });                                         

                                },
                                error: function (xhr, status) {

                                    console.log(status);
                                    alert('Disculpe, existió un problema');
                                },
                            });
                        } catch (e) {

                            $(function () {
                                $("#dialogo-incorrecto").dialog(
                                    {
                                        modal: true,
                                        buttons: {
                                            Ok: function () {
                                                $(this).dialog("close");
                                            }
                                        }
                                    }
                                );
                            });
                        }

                        $(this).dialog("close");
                    },

                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });



        }
        else alert("Los campos de la contraseña no coinciden")



    }); // fin funcion insertar usuario global

    $('#editar_usuario').on('click', function () {

        var mailedit= $('#edit_mail_usuario').val();
        var nombreedit = $('#edit_nombre_usuario').val();
        var ciudadedit = $('#edit_ciudad_usuario').val();
        var postaledit = $('#edit_cod_postal_usuario').val();
        var numeroedit = $('#edit_numero_usuario').val();
        var passedit = $('#edit_pass').val();

        var datosform = {};

        datosform.Email = mailedit;
        datosform.PhoneNumber = numeroedit;
        datosform.UserName = nombreedit;
        datosform.Ciudad = ciudadedit;
        datosform.Cod_postal = postaledit;
        datosform.PasswordHash = passedit;
        datosform.rolCambio = "";
        //console.log(datosform);

        $(function () {
            $("#confirmar-editar").dialog({ // MUESTRO EL DIÁLOGO DE CONFIRMAR PARA ACUTALIZAR
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Actualizar": function () { // BOTON DEL DIALOGO PARA ACTUALIZAR

                        try {
                            $.ajax({
                                url: 'http://localhost:55174/api/users/' + id,
                                type: 'PUT',
                                data: JSON.stringify(datosform),
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                success: function (json) {

                                    //console.log(json);

                                    $("#dialogo-correcto").children().remove();
                                    $("#dialogo-correcto").append("<p> USUARIO ACTUALIZADO CORRECTAMENTE </p>");
                                  
                                    newData =
                                    {
                                        "Id": id,
                                        "UserName": datosform.UserName,
                                        "Email": datosform.Email,
                                        "PhoneNumber": datosform.PhoneNumber,
                                        "Ciudad": datosform.Ciudad,
                                        "Cod_postal": datosform.Cod_postal,
                                        "rol" : rol
                                    };

                                    tabla_usuarios.row($('#' + id)).data(newData).draw();

                                    $(function () {
                                        $("#dialogo-correcto").dialog(
                                            {
                                                modal: true,
                                                buttons: {
                                                    Ok: function () {
                                                        $(this).dialog("close");
                                                    }
                                                }
                                            }
                                        );
                                    });                                   

                                },
                                error: function (xhr, status) {
                                    alert('Disculpe, existió un problema');
                                },
                            });
                        } catch (e) {

                            $(function () {
                                $("#dialogo-incorrecto").dialog(
                                    {
                                        modal: true,
                                        buttons: {
                                            Ok: function () {
                                                $(this).dialog("close");
                                            }
                                        }
                                    }
                                );
                            });

                        }

                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        });


    });

    $(document).on('click','.cambiar_rol' ,function () {

        var id = $(this).closest('tr').attr('id');
        var rol_para_cambiar = "";

        if (rol == 1) rol_para_cambiar = "2";
        else rol_para_cambiar = "1";

        var datosform = {};
        datosform.rolCambio = rol_para_cambiar;

        console.log(datosform);

        $.ajax({
            url: 'http://localhost:55174/api/users/' + id,
            type: 'PUT',
            data: JSON.stringify(datosform),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (json) {

                $("#dialogo-correcto").children().remove();
                $("#dialogo-correcto").append("<p>Usuario cambiado de rol</p>"); // PINTO LA RESPUESTA DEL JSON EN EL CUADRO DIÁLOGO

                newData =
                {
                    "Id": id,
                    "UserName": nombre_usuario,
                    "Email": email,
                    "PhoneNumber": numero_usuario,
                    "Ciudad": ciudad,
                    "Cod_postal": cod_postal,
                    "rol": rol_para_cambiar
                };

                tabla_usuarios.row($('#' + id)).data(newData).draw();

                $(function () { // FUNCION PARA MOSTRAR EL DIÁLOGO
                    $("#dialogo-correcto").dialog(
                        {
                            modal: true,
                            buttons: {
                                Ok: function () {

                                    $(this).dialog("close");
                                }
                            }
                        });
                });

            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
        });



    });

    // FIN PANEL DE USUARIOS    

    $('#cerrar_modal').click(function () {

        $('#modal_subir').removeClass('visible');
        $('#modal_subir').addClass('oculto');
    })

    $('#btnUpload').click(function () {

        upload = true;

    });

    let logout = false;

    $('#logoutbutton').click(function () {

        logout = true;

    });

    $('#formglobal').on('submit', function (e) {

        //e.preventDefault();
        //console.log(e.target);
        if (logout) {
            logout = false;

            $.ajax({
                url: 'http://localhost:55174/api/logout/', // en el servidor vamos al controlador para recoger los archivos
                type: 'GET',
                async: false,
                cache: false,
                success: function (response) {

                    
                   window.location.replace("Login.aspx");

                }
            });

        }


        if (upload) {
            upload = false;
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

                    alert(response);

                }
            });
        }

        return false;      // devuelvo false para que no me recargue la pagina
    });

    $('#formulario_foto').on('submit', function (e) {
        //console.log("1")
        return false;
    });

    $(function () {
        $("#panel-admin").tabs();
    });

    // PANEL ERRORES ///////////////////////////////////////////

    var array_errores = [];
    //console.log("errores", array_errores);

    getErrores();

    function getErrores()
    {
        $.ajax({
            url: 'http://localhost:55174/api/errores/',
            type: 'GET',
            dataType: 'JSON',
            success: function (respuesta) {                

                array_errores = respuesta;

                for (var i = 0; i < array_errores.length; i++) {

                    fecha = array_errores[i].fecha; // 
                    var fecha2 = new Date(fecha); // VOY SACANDO LAS FECHAS DESDE EL ARRAY QUE ME LLEGA 
                    var mes = fecha2.getMonth() + 1;
                    fecha_format = fecha2.getDate() + "-" + mes + "-" + fecha2.getFullYear() + "/" + fecha2.getHours() + ":" + fecha2.getMinutes() + ":" + fecha2.getSeconds();

                    array_errores[i].fecha = fecha_format; // SOBREESCRIBO LA FECHA DEL ARRAY CON LA FECHA FORMATEADA
                    array_errores[i].fechaDate = fecha2; // AÑADO AL ARRAY DE ERRORES LA FECHA DE TIPO DATE DE JAVASCRIPT
                }
                //console.log(array_errores);
                pintarErrores(array_errores);
                
            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
        });
    }

    function pintarErrores(array) {

        $(".cuerpotabla_errores").children().remove();

        for (var i = 0; i < array.length; i++)
        {                       
            $(".cuerpotabla_errores").append("<tr id='" + array[i].id_error + "'><td>" + array[i].fecha + "</td><td>" + array[i].metodo + "</td><td>" + array[i].clase + "</td><td>" + array[i].mensaje + "</td><td>" + array[i].id_error + "</td></tr>");
        }

        //console.log(array_errores);
    }

    function filtrar() {

        var coincidencias = array_errores;

        if ($('#filtro_metodo').val() != "")
        {
            coincidencias = coincidencias.filter(x =>
            {
                return x.metodo.toLowerCase().indexOf($('#filtro_metodo').val().toLowerCase()) > -1;

            });
        }

        if ($('#filtro_clase').val() != "") {
            coincidencias = coincidencias.filter(x =>
            {
                return x.clase.toLowerCase().indexOf($('#filtro_clase').val().toLowerCase()) > -1;

            });
        }

        if ($('#filtro_mensaje').val() != "") {
            coincidencias = coincidencias.filter(x =>
            {
                return x.mensaje.toLowerCase().indexOf($('#filtro_mensaje').val().toLowerCase()) > -1;
            });
        }

        if ($('#filtro_id').val() != "") {
            coincidencias = coincidencias.filter(x =>
            {
                return x.id_error.toLowerCase().indexOf($('#filtro_id').val().toLowerCase()) > -1;
            });
        }

        var fecha_ini = Date.parse($('#filtro_fecha_ini').val());
        var fecha_fin = Date.parse($('#filtro_fecha_fin').val());

        if ($('#filtro_fecha_ini').val() != "" && $('#filtro_fecha_fin').val() != "") {
            coincidencias = coincidencias.filter(x =>
            {                 
                 return (x.fechaDate >= fecha_ini && x.fechaDate <= fecha_fin);
            });
        }

        pintarErrores(coincidencias);
    }

    $(function () {
        $("#filtro_fecha_ini").datepicker({ dateFormat: 'mm/dd/yy' });
        $("#filtro_fecha_fin").datepicker({ dateFormat: 'mm/dd/yy' });
    });

    $('#filtro_fecha_fin').on('change', function () {

        filtrar();

        //var input, filter, table, tr, td, i, txtValue;

        //var fecha_ini = $('#filtro_fecha_ini').val();
        //var fecha_fin = $('#filtro_fecha_fin').val();

        //input = document.getElementById('filtro_fecha');
        //filter = input.value.toUpperCase();
        //table = document.getElementById("tabla_errores");
        //tr = table.getElementsByTagName("tr");

        //for (i = 0; i < tr.length; i++) {

        //    td = tr[i].getElementsByTagName("td")[0];

        //    if (td) {

        //            txtValue = td.textContent || td.innerText;

        //        if (txtValue.toUpperCase().indexOf(filter) > -1)
        //        {
        //            tr[i].style.display = "";

        //        } else {

        //            tr[i].style.display = "none";

        //        }
        //    }
        //}

    });

     $('#filtro_metodo').on('keyup', function () {

        filtrar();

     });

    $('#filtro_clase').on('keyup', function () {

        filtrar();

    });

    $('#filtro_mensaje').on('keyup', function () {

        filtrar();

    });

    $('#filtro_id').on('keyup', function () {

        filtrar();

    });

    $('#reiniciar_filtros').click(function () {

        pintarErrores(array_errores);

    });


    // PANEL GUITARRAS //////////////////////////////////////////

    var marca;
    var modelo;
    var anyo;
    var categoria;
    var precio;
    var descripcion;
    var estado;
    var propietario;
 

    mostrar();

    var listacategorias = []; // ARRAY CON LOS IDS DE LAS CATEGORIAS Y SU NOMBRE
    console.log(listacategorias);

    function mostrar() {
        $.ajax({
            url: 'http://localhost:55174/api/guitarra/',
            type: 'GET',
            dataType: 'JSON',
            success: function (respuesta) {              

                $(".cuerpotabla").children().remove();
                for (var i = 0; i < respuesta.listaguitarras.length; i++)
                {
                    $(".cuerpotabla").append("<tr class='fila' id='" + respuesta.listaguitarras[i].id + "'><td>" + respuesta.listaguitarras[i].marca + "</td><td>" + respuesta.listaguitarras[i].modelo + "</td><td>" + respuesta.listaguitarras[i].anyo + "</td><td class='centrado'>" + respuesta.listaguitarras[i].precio + " € </td><td>" + respuesta.listaguitarras[i].descripcion + "</td><td>" + respuesta.listaguitarras[i].estado + "</td><td class='" + respuesta.listaguitarras[i].id_categoria + "'>" + respuesta.listaguitarras[i].nombre_categoria + "</td><td>" + respuesta.listaguitarras[i].id_usuario +"</td><td><button class='foto ui-button ui-widget ui-corner-all ui-button-icon-only'><span class='ui-icon ui-icon-gear'></span></button ></td></tr>");
                }

                if (listacategorias.length < 17) {
                    for (var i = 0; i < respuesta.listacategorias.length; i++) {

                        listacategorias.push(respuesta.listacategorias[i]);
                    }
                }

            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
        });
    }

    $("#borrar").on("click", function (event) {

        event.preventDefault();

        var id = $('.click').attr('id');
        
        $(function () {
            $("#confirmar-borrar").dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Borrar elemento": function () {
                        $.ajax({
                            url: 'http://localhost:55174/api/guitarra/' + id,
                            type: 'DELETE',
                            dataType: 'json',
                            success: function (json) {

                                //console.log(json);
                                $("#dialogo-correcto").children().remove();
                                $("#dialogo-correcto").append("<p>" + json + "</p>"); // PINTO LA RESPUESTA DEL JSON EN EL CUADRO DIÁLOGO

                                $(function () { // FUNCION PARA MOSTRAR EL DIÁLOGO
                                    $("#dialogo-correcto").dialog(
                                     {
                                        modal: true,
                                        buttons: {
                                            Ok: function () {
                                                $(this).dialog("close");
                                            }
                                        }
                                     });
                                });

                                if (json === "CAMPO ELIMINADO CON ÉXITO" )    $(".click").children().remove(); // SI LA RESPUESTA ES CORRECTA, QUITO EL TR DE LA TABLA
                               
                            },
                            error: function (xhr, status) {
                                alert('Disculpe, existió un problema');
                            },
                        });

                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

    }); // funcion borrar

    $(document).on("click", ".filaIn", function () { // CUANDO SE HACE CLICK EN FILA

        try {

            $('#editar').show(); // MUESTRO EL BOTON EDITAR

            $(this).removeClass('filaIn'); //QUITA LA CLASE DE FILA RESALTADA
            $(this).addClass('click'); // AÑADE CSS DE ESTILO PARA CUANDO SE CLICA
            $(this).siblings().removeClass('click').addClass("fila"); // A LOS HERMANOS(OTRO TR QUE YA ESTÉ CLICADO) SE LE QUITA LA CLASE QUE TIENE YA CLICADA
            $('.head').removeClass("fila");

            marca = $(this).children()[0].textContent; // FILA 1, AÑADO A LA MARCA DECLARADA FUERA EL TEXTCONTENT DE LA CELDA SELECCIONADA
            modelo = $(this).children()[1].textContent;
            anyo = $(this).children()[2].textContent;
            precio = $(this).children()[3].textContent;
            descripcion = $(this).children()[4].textContent;
            estado = $(this).children()[5].textContent;
            //categoria = $(this).children()[6].className;
            categoria = $(this).children().eq(6).attr("class");
            nombre_categoria = $(this).children()[6].textContent;
            propietario = $(this).children()[7].textContent;

        

            for (var i = 0; i < listacategorias.length; i++) {
               
                $("#optionscategorias").append("<option value='" + listacategorias[i].id_categoria + "'>" + listacategorias[i].nombre_categoria + "</option>");
            }

            $("#optionscategorias option[value=" + categoria + "]").prop('selected', true).change();


        } catch (e) {
            $(function () {
                $("#dialogo-incorrecto").dialog(
                    {
                        modal: true,
                        buttons: {
                            Ok: function () {
                                $(this).dialog("close");
                            }
                        }
                    }
                );
            });

        }

    }); // Cuando se hace click en la fila se rellenan las variables globales con los datos de esa fila

    //console.log(listacategorias);
    
    $("#editbutton").click(function (event) { // BOTON FINAL DE INSERTAR

        event.preventDefault();

        var id = $('.click').attr('id');

        try {
            var marcaedit = $('#marcaedit').val(); // AQUI RELLENO EL DATAFORM PARA LA LLAMADA AJAX CON LOS VALORES DE LAS VARIABLES GLOBALES
            var modeloedit = $('#modeloedit').val();
            var anyoedit = $('#anyoedit').val();
            var precioedit = $('#precioedit').val().replace("€", "");
            var descripcionedit = $('#descripcionedit').val();
            var estadoedit = $('#estadoedit').val();
            var categoriaedit = $('#optionscategorias').val();
            var propietarioedit = $('#propietarioedit').val();
            var nombre_categoriaedit = $('#optionscategorias').textContent;

            datosform = {};
            datosform.marca = marcaedit;
            datosform.modelo = modeloedit;
            datosform.anyo = anyoedit;
            datosform.categoria = categoriaedit;
            datosform.precio = precioedit;
            datosform.descripcion = descripcionedit;
            datosform.estado = estadoedit;
            datosform.id_usuario = propietarioedit;

        } catch (e) {

            $(function () {
                $("#dialogo-incorrecto").dialog(
                    {
                        modal: true,
                        buttons: {
                            Ok: function () {
                                $(this).dialog("close");
                            }
                        }
                    }
                );
            });

        }

        $(function () {
            $("#confirmar-editar").dialog({ // MUESTRO EL DIÁLOGO DE CONFIRMAR PARA ACUTALIZAR
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Actualizar": function () { // BOTON DEL DIALOGO PARA ACTUALIZAR

                        try {
                            $.ajax({
                                url: 'http://localhost:55174/api/guitarra/' + id,
                                type: 'PUT',
                                data: JSON.stringify(datosform),
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                success: function (json) {

                                    //console.log(json);

                                    $("#dialogo-correcto").children().remove();
                                    $("#dialogo-correcto").append("<p>" + json + "</p>");

                                    $(function () {
                                        $("#dialogo-correcto").dialog(
                                            {
                                                modal: true,
                                                buttons: {
                                                    Ok: function () {
                                                        $(this).dialog("close");
                                                    }
                                                }
                                            }
                                        );
                                    });

                                    $(".click").children().remove();

                                    if (json === "ACTUALIZADO CON ÉXITO")
                                    {
                                        var id_categoria = datosform.categoria;
                                        var nombre_categoria = listacategorias.find(x => x.id_categoria === id_categoria).nombre_categoria; // BUSCO EL NOMBRE DE LA CATEGORIA QUE HACE REFERENCIA A SU ID EN EL ARRAY QUE DEVUELVO DE LA LISTA DE CATEGORIAS

                                        $(".cuerpotabla tr#"+id).append("<td>" + datosform.marca + "</td><td>" + datosform.modelo + "</td><td>" + datosform.anyo + "</td><td class='centrado'>" + datosform.precio + "€ </td><td>" + datosform.descripcion + "</td><td>" + datosform.estado + "</td><td class='" + datosform.categoria + "'> " + nombre_categoria + " </td><td>" + datosform.id_usuario + "</td><td><button class='foto ui-button ui-widget ui-corner-all ui-button-icon-only'><span class='ui-icon ui-icon-gear'></span></button ></td>");
                                    }
                                    else
                                    {
                                        $(".cuerpotabla").append("<tr class='fila' id='" + id + "'><td>" + marca + "</td><td>" + modelo + "</td><td>" + anyo + "</td><td class='centrado'>" + precio + "</td><td>" + descripcion + "</td><td>" + estado + "</td><td class='" + categoria + "'> " + nombre_categoria + " </td><td>" + propietario + "</td><td><button class='foto ui-button ui-widget ui-corner-all ui-button-icon-only'><span class='ui-icon ui-icon-gear'></span></button ></td></tr>");
                                    }

                                },
                                error: function (xhr, status) {

                                    //console.log(status);
                                    alert('Disculpe, existió un problema');
                                },
                            });
                        } catch (e) {

                            $(function () {
                                $("#dialogo-incorrecto").dialog(
                                    {
                                        modal: true,
                                        buttons: {
                                            Ok: function () {
                                                $(this).dialog("close");
                                            }
                                        }
                                    }
                                );
                            });
                           
                        }

                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

    });

    $("#insertbutton").click(function () { // INSERTAR
        
        try {
            var marcainsert = $('#marcainsert').val();
            var modeloinsert = $('#modeloinsert').val();
            var anyoinsert = $('#anyoinsert').val();
            var precioinsert = $('#precioinsert').val();
            var descripcioninsert = $('#descripcioninsert').val();
            var estadoinsert = $('#estadoinsert').val();
            var categoriainsert = $('#optionscategoriasinsert').val();
            var propietarioinsert = $('#propietarioinsert').val();

            datosform = {};

            datosform.marca = marcainsert;
            datosform.modelo = modeloinsert;
            datosform.anyo = anyoinsert;
            datosform.categoria = categoriainsert;
            datosform.precio = precioinsert;
            datosform.descripcion = descripcioninsert;
            datosform.estado = estadoinsert;
            datosform.id_usuario = propietarioinsert;

        } catch (e) {

            $(function () {
                $("#dialogo-incorrecto").dialog(
                    {
                        modal: true,
                        buttons: {
                            Ok: function () {
                                $(this).dialog("close");
                            }
                        }
                    }
                );
            });

        }

        $(function () {
            $("#confirmar-insertar").dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Introducir": function () {

                        try {
                            $.ajax({
                                url: 'http://localhost:55174/api/guitarra/',
                                type: 'POST',
                                data: JSON.stringify(datosform),
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                success: function (json) {

                                    //console.log(json);

                                    $("#dialogo-correcto").children().remove();
                                    $("#dialogo-correcto").append("<p>" + json.mensaje + "</p>");

                                    $(function () {
                                        $("#dialogo-correcto").dialog(
                                            {
                                                modal: true,
                                                buttons: {
                                                    Ok: function () {

                                                        $(this).dialog("close");
                                                    }
                                                }
                                            }
                                        );
                                    });

                                    if (json.mensaje === "INSERCIÓN CORRECTA")
                                    {

                                        var id_categoria = datosform.categoria;
                                        var nombre_categoria = listacategorias.find(x => x.id_categoria === id_categoria).nombre_categoria;

                                        $(".cuerpotabla").append("<tr class='fila' id='" + json.id + "'><td>" + datosform.marca + "</td><td>" + datosform.modelo + "</td><td>" + datosform.anyo + "</td><td class='centrado'>" + datosform.precio + "€ </td><td>" + datosform.descripcion + "</td><td>" + datosform.estado + "</td><td class='" + datosform.categoria + "'> " + nombre_categoria + " </td><td>" + datosform.id_usuario + "</td><td><button class='foto ui-button ui-widget ui-corner-all ui-button-icon-only'><span class='ui-icon ui-icon-gear'></span></button></td></tr>");
                                    }

                                    //mostrar();

                                },
                                error: function (xhr, status) {

                                    console.log(status);
                                    alert('Disculpe, existió un problema');
                                },
                            });
                        } catch (e) {

                            $(function () {
                                $("#dialogo-incorrecto").dialog(
                                    {
                                        modal: true,
                                        buttons: {
                                            Ok: function () {
                                                $(this).dialog("close");
                                            }
                                        }
                                    }
                                );
                            });
                        }

                        $(this).dialog("close");
                    },

                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        });
       
        
    });

    $(document).on("mouseover",".fila", function () {
        $(this).removeClass('fila');
        $(this).addClass('filaIn');
    });

    $(document).on("mouseleave", ".filaIn", function () {
        $(this).removeClass('filaIn');
        $(this).addClass('fila');
    });

    $(document).on("click", ".click", function () { // HACER CLICK SOBRE ALGO YA CLICADO

        $(this).removeClass('click');
        $(this).addClass('filaIn');
        $('#editar').hide();        
    });

    $('#insertar').click(function () {  

        for (var i = 0; i < listacategorias.length; i++) {
            $("#optionscategoriasinsert").append("<option value='" + listacategorias[i].id_categoria + "'>" + listacategorias[i].nombre_categoria + "</option>");
        }
        $('#formnuevo').dialog();        
    });

    $("#editar").click(function () { // cuando llamo al botón de editar, me muestra el formulario con los campos rellenos CON LAS VARIABLES DEL DATAFORM    

        $('#formedit').dialog(); // relleno los campos del formulario EDITAR cuando le doy al botón editar
        $('#marcaedit').val(marca);  
        $('#modeloedit').val(modelo);
        $('#anyoedit').val(anyo);
        $('#precioedit').val(precio);
        $('#descripcionedit').val(descripcion);
        $('#estadoedit').val(estado);
        $('#categoriaedit').val(categoria);
        $('#propietarioedit').val(propietario);                    
    });
 
});

