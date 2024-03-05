<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EditarPerfil.aspx.cs" Inherits="Guitarras.EditarPerfil" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Perfil de usuario</title>

    <script src="Scripts/jquery-3.4.1.min.js"></script>                                                                <%--JS JQUERY--%>
    <script src="Scripts/jquery-ui-1.13.1.custom/jquery-ui.js"></script>
    <script src="Scripts/bootstrap.js"></script>                                                                       <%-- JS BOOTSTRAP--%>
    <script type="text/javascript" src="/Scripts/editar_perfil.js"></script>                                                 <%--JS PAGINA ACTUAL--%>
    <script src="Scripts/commons.js"></script>
    <link href="Scripts/jquery-ui-1.13.1.custom/jquery-ui.css" rel="stylesheet" />                                      <%--CSS UI--%>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">              <%--CSS BOOTSTRAP ONLINE--%>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>           <%--CSS ICONOS--%>
    <link rel="stylesheet" href="styles/styles.css" type="text/css" />  




</head>

<body class="cuerpo_pagina">
    
    <div class="container" id="busqueda_general">
        <div class="row d-flex justify-content-center">
            <div class="col-md-1"><a href="Portada.aspx"><img class="logo" src="img/logo.jpg" alt="logo" /></a></div>
            <div class="col-md-7">
                <div class="search"><i class="fa fa-search"></i> <input id="input_buscador_general" type="text" class="form-control" placeholder="Busca entre todas las categorías"/>  
                </div>
            </div>
                <div class="col-md-4 botones_panel"><a href="SubirProducto.aspx" id="link_subir"><button class="btn" id="subir_producto"><i class="fa-solid fa-circle-plus"></i></button> </a><a id="link_login" href="Login.aspx"><button id="boton_sesion" class="btn">REGÍSTRATE O INICIA SESÍON</button></a><a href="Perfil.aspx" id="link_perfil"><button id="boton_perfil" class="btn"><i class="fa-solid fa-user-gear"></i></button></a> <form id="Logout"><input type="submit" class="btn" id="logoutbutton" value ="CERRAR SESIÓN"/></form><button id="mis_mensajes" class="btn"><i class="fa-solid fa-comment-dots"></i></button> </div></div> 
        </div>

        <div class="form-body">
        <div class="row">
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3>Datos personales:</h3>
                        
                        <form id="form_perfil" class="requires-validation" novalidate>

                            <div class="col-md-12">
                                <label for="name">Nombre de usuario:</label>
                               <input id="nombre" class="form-control" type="text" name="name" disabled required>
                            </div>

                            <div class="col-md-12">
                                <label for="email">E-Mail:</label>
                                <input id="mail" class="form-control" type="email" name="email" required>
                            </div>                           


                           <div class="col-md-12">
                               <label for="password">Contraseña:</label>
                              <input id="pass" class="form-control" type="password" name="password" required>
                           </div>     
                            
                            <div class="col-md-12">
                               <label for="password2">Repita contraseña:</label>
                              <input id="pass2" class="form-control" type="password" name="password2" required>
                           </div>    

                            <div class="col-md-12">
                               <label for="telefono">Teléfono:</label>
                              <input id="telefono" class="form-control" type="number" name="telefono" required>
                           </div>    

                            <div class="col-md-12">
                               <label for="ciudad">Ciudad:</label>
                              <input id="ciudad" class="form-control" type="text" name="ciudad">
                           </div>

                            <div class="col-md-12">
                               <label for="cod_postal">Cod. Postal:</label>
                              <input id="cod_postal" class="form-control" type="text" name="cod_postal">
                           </div>

                  

                            <div class="form-button mt-3">
                                <button id="guardar_perfil" type="submit" class="btn btn-primary">Guardar cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

        <div hidden id="pass_incorrecta" title="ERROR!"> 
                    <p>LAS CONTRASEÑAS DEBEN COINCIDIR</p>                   
                </div>

        <div hidden id="dialogo-correcto" title="MENSAJE"> 
            <p>ACTUALIZADO CORRECTAMENTE </p>
                </div>







        <%--<div id="form_editar_perfil" class="container">


  <div class="mb-3 mt-3">
    <label for="email" class="form-label">Email:</label>
    <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
  </div>

  <div class="mb-3">
    <label for="pwd" class="form-label">Password:</label>
    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
  </div>

  <div class="form-check mb-3">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" name="remember"> Remember me
    </label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>


        </div>--%>








</body>
</html>
