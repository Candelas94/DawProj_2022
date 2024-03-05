<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EditarProducto.aspx.cs" Inherits="Guitarras.EditarProducto" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <script src="Scripts/jquery-3.4.1.min.js"></script>                                                                <%--JS JQUERY--%>
    <script src="Scripts/jquery-ui-1.13.1.custom/jquery-ui.js"></script>
    <script src="Scripts/bootstrap.js"></script>                                                                       <%-- JS BOOTSTRAP--%>
    <script type="text/javascript" src="/Scripts/editar_producto.js"></script>                                         <%--JS PAGINA ACTUAL--%>
    <script src="Scripts/commons.js"></script>
    <link href="Scripts/jquery-ui-1.13.1.custom/jquery-ui.css" rel="stylesheet" />                                     <%--CSS UI--%>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">             <%--CSS BOOTSTRAP ONLINE--%>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>          <%--CSS ICONOS--%>
    <link rel="stylesheet" href="styles/styles.css" type="text/css" />  





<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Editar Producto</title>
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
                        <h3>Edita tu producto:</h3>
                        
                        <form id="form_producto" class="requires-validation" novalidate>                           

                            <div class="col-md-12">
                                <label for="name">Precio:</label>
                               <input id="precio_producto" class="form-control" type="number" name="name" required>                               
                            </div>

                            <div class="col-md-12">
                                <label for="email">Marca:</label>
                                <input id="marca_producto" class="form-control" type="text" name="email" required>                                 
                            </div>

                           <div class="col-md-12">
                               <label for="password">Modelo:</label>
                              <input id="modelo_producto" class="form-control" type="text" name="password" required>
                           </div>     
                            
                            <div class="col-md-12">
                               <label for="categoria">Categoria:</label>                             
                                <select name ="categoria" id="optionscategorias">
                                </select>
                           </div>    

                            <div class="col-md-12">
                               <label for="anyo_producto">Año:</label>
                              <input id="anyo_producto" class="form-control" type="text" name="anyo_producto" required>
                           </div>    

                            <div class="col-md-12">
                               <label for="estado_product">Estado:</label>
                              <input id="estado_product" class="form-control" type="text" name="estado_product" required>
                           </div>

                            <div class="col-md-12">
                               <label for="descripcion_producto">Descripción:</label>
                              <textarea class="form-control" id="descripcion_producto" name="descripcion_producto" rows="3"></textarea>
                           </div>                  
                            <div class="form-button mt-3">
                                <button id="guardar_producto" type="submit" class="btn btn-primary">Guardar cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

         <div id="modal_subir" class="oculto">
                    
                      <form id="formulario_foto" method="post" EncType="multipart/form-data">
                                  Sube una o varias imagenes: <input  id="oFile" type="file" NAME="oFile">
                                  <input id="id_producto_foto" type="text" name="id_producto" />
                                  <input id="btnUpload" type="submit" value="ACEPTAR"/><button id="cerrar_modal">CERRAR</button>
                                  <Label id="lblUploadResult"></Label>
                       </form>
    </div>  

        <div hidden id="dialogo-correcto" title="MENSAJE"> 
            <p>ACTUALIZADO CORRECTAMENTE </p>
                </div>
    
</body>
</html>
