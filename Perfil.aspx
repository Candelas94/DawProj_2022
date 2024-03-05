<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Perfil.aspx.cs" Inherits="Guitarras.Perfil" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Mi Perfil</title>

     <script src="Scripts/jquery-3.4.1.min.js"></script>                                                                <%--JS JQUERY--%>
    <script src="Scripts/bootstrap.js"></script>                                                                       <%-- JS BOOTSTRAP--%>
    <script type="text/javascript" src="/Scripts/perfil.js"></script>                                                 <%--JS PAGINA ACTUAL--%>
    <script src="Scripts/commons.js"></script>

    <link href="Scripts/jquery-ui-1.13.1.custom/jquery-ui.css" rel="stylesheet" />                                      <%--CSS UI--%>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">              <%--CSS BOOTSTRAP ONLINE--%>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>           <%--CSS ICONOS--%>
    <link rel="stylesheet" href="styles/styles.css" type="text/css" />                                                  <%--CSS PROPIO--%>

</head>
<body class="cuerpo_pagina">

    <div class="container  mb-3" id="busqueda_general">
        <div class="row d-flex justify-content-center">
            <div class="col-md-1"><a href="Portada.aspx"><img class="logo" src="img/logo.jpg" alt="logo" /></a></div>
            <div class="col-md-7">
                <div class="search"><i class="fa fa-search"></i> <input id="input_buscador_general" type="text" class="form-control" placeholder="Busca entre todas las categorías"/> </div>
            </div>
            <div class="col-md-4 botones_panel"><a href="SubirProducto.aspx" id="link_subir"><button class="btn" id="subir_producto"><i class="fa-solid fa-circle-plus"></i></button> </a><a id="link_login" href="Login.aspx"><button id="boton_sesion" class="btn">REGÍSTRATE O INICIA SESÍON</button></a><a href="Perfil.aspx" id="link_perfil"><button id="boton_perfil" class="btn"><i class="fa-solid fa-user-gear"></i></button></a> <form id="Logout"><input type="submit" class="btn" id="logoutbutton" value ="CERRAR SESIÓN"/></form><button id="mis_mensajes" class="btn"><i class="fa-solid fa-comment-dots"></i></button> </div></div> 
        </div>

    <div class="container mb-3">
        <div class="row d-flex justify-content-center">

             <div class="col-md-3"><button id="favoritos" class="btn">Favoritos<i class='fa-regular fa-heart'></i></button></div>
            <div class="col-md-3"><button id="editar_perfil" class="btn">MODIFICAR MIS DATOS<i class="fa-solid fa-gear"></i></button></div>

        </div>
    </div>

    <div class="container" id="div_principal">

    </div>


</body>
</html>
