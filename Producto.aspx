<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Producto.aspx.cs" Inherits="Guitarras.Producto" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <script src="Scripts/jquery-3.4.1.min.js"></script>                                                                <%--JS JQUERY--%>
    <script src="Scripts/bootstrap.js"></script>                                                                       <%-- JS BOOTSTRAP--%>
    <script type="text/javascript" src="/Scripts/producto.js"></script>                                                 <%--JS PAGINA ACTUAL--%>
    <script src="Scripts/commons.js"></script>
    <link href="Scripts/jquery-ui-1.13.1.custom/jquery-ui.css" rel="stylesheet" />                                      <%--CSS UI--%>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">              <%--CSS BOOTSTRAP ONLINE--%>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>           <%--CSS ICONOS--%>
    <link rel="stylesheet" href="styles/styles.css" type="text/css" />                                                  <%--CSS PROPIO--%>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

    <title>FakePop</title>
</head>

<body class="cuerpo_pagina">

    <div class="container  mb-3" id="busqueda_general">
        <div class="row d-flex justify-content-center">
            <div class="col-md-1"><a href="Portada.aspx"><img class="logo" src="img/logo.jpg" alt="logo" /></a></div>
            <div class="col-md-7">
                <div class="search"><i class="fa fa-search"></i> <input id="input_buscador_general" type="text" class="form-control" placeholder="Busca entre todas las categorías"/></div>
            </div>
            <div class="col-md-4 botones_panel"><a href="SubirProducto.aspx" id="link_subir"> <button class="btn" id="subir_producto"><i class="fa-solid fa-circle-plus"></i></button> </a><a id="link_login" href="Login.aspx"><button id="boton_sesion" class="btn">REGÍSTRATE O INICIA SESÍON</button></a><a href="Perfil.aspx" id="link_perfil"><button id="boton_perfil" class="btn"><i class="fa-solid fa-user-gear"></i></button></a> <form id="Logout"><input type="submit" class="btn" id="logoutbutton" value ="CERRAR SESIÓN"/></form><button id="mis_mensajes" class="btn"><i class="fa-solid fa-comment-dots"></i></button> </div></div> 
        </div>  
    

<div class="modal fade" id="slider_modal" tabindex="-1" aria-labelledby="slider_modalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="slider_modalLabel">Imágenes:</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
                    <div id="slider_imgs" class="carousel slide" data-bs-ride="carousel">
                          <!-- Indicators/dots -->
                          <div class="carousel-indicators">
                            <button type="button" data-bs-target="#slider_imgs" data-bs-slide-to="0" class="active"></button>
                            <button type="button" data-bs-target="#slider_imgs" data-bs-slide-to="1"></button>
                            <button type="button" data-bs-target="#slider_imgs" data-bs-slide-to="2"></button>
                          </div>

                          <!-- The slideshow/carousel -->
                          <div class="carousel-inner">
                            <div class="carousel-item active">
                              <img src="img/guitarra.png" alt="Los Angeles" class="d-block w-100" id="img1">
                            </div>
                            <div class="carousel-item">
                              <img src="img/logo.jpg" alt="Chicago" class="d-block w-100" id="img2">
                            </div>                            
                          </div>

                          <!-- Left and right controls/icons -->
                          <button class="carousel-control-prev" type="button" data-bs-target="#slider_imgs" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                          </button>
                          <button class="carousel-control-next" type="button" data-bs-target="#slider_imgs" data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                          </button>
                        </div>
      </div>
    </div>
  </div>
</div>

    <div id="tarjeta_producto">

        <div class="row d-flex justify-content-center">
            <div class='col-4 d-flex justify-content-center'>
            <div class='card' style ='width:55rem;' id="inner_tarjeta">
                   <img src='img/guitarra.png' class='card-img-top' alt='imagen del producto' id="imagen_producto"/>
                   <div class='card-body'>
                   <div class='card-title' id="titulo_tarjeta"><span id="precio_producto"></span><button id="boton_like"><i class='fa-regular fa-heart'></i></button> <button id="boton_chat">Chat con el vendedor</button><button type="button" id="boton_slider" data-bs-toggle="modal" data-bs-target="#slider_modal">Ver imágenes</button></div>
                   <p class='card-text' id="cuerpo_tarjeta">
                      <h4 id="marca_modelo_producto"></h4>
                      <div id="categoria_anyo"><button id="nombre_categoria"></button><span id="anyo_producto"></span><span id="estado_producto"></span></div>
                      <p id="descripcion_producto"></p></br>
                      <button class="btn" id="perfil_vendedor"><i class="fa-solid fa-user-large mr-10"></i><span id="vendedor"></span></button>
                   </p >                   
                   </div>
            </div>
            </div>
        </div>
    </div>


</body>
</html>
