<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Guitarras.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <script src="Scripts/jquery-3.4.1.min.js"></script> 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
    <script type="text/javascript" src="/Scripts/portada.js"></script>
    <link href="Scripts/jquery-ui-1.13.1.custom/jquery-ui.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>
    <link rel="stylesheet" href="styles/styles.css" type="text/css" />

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>

<body class="cuerpo_pagina" style="font-family: Arial, Helvetica, sans-serif; font-size: large">

    <div class="container  mb-3" id="busqueda_general">
        <div class="row d-flex justify-content-center">
            <div class="col-md-1"><a href="Portada.aspx"><img class="logo" src="img/logo.jpg" alt="logo" /></a></div>
            <div class="col-md-9">
                <div class="search"><i class="fa fa-search"></i> <input id="input_buscador_general" type="text" class="form-control" placeholder="Busca entre todas las categorías"/> <button class="btn btn-secondary">Search</button> </div>
            </div>
            </div> 
        </div>

   <form class="formulario_user" runat="server">
      <div>
         <h2>Log In</h2>
         <hr />
         <asp:PlaceHolder runat="server" ID="LoginStatus" Visible="false">
            <p>
               <asp:Literal runat="server" ID="StatusText" />
            </p>
         </asp:PlaceHolder>

         <asp:PlaceHolder runat="server" ID="LoginForm" Visible="false">
            <div style="margin-bottom: 10px">
               <asp:Label style="white-space:nowrap" runat="server" AssociatedControlID="UserName">Nombre de usuario</asp:Label>
               <div>
                  <asp:TextBox class="input_user" runat="server" ID="UserName" />
               </div>
            </div>
            <div style="margin-bottom: 10px">
               <asp:Label style="white-space:nowrap" runat="server" AssociatedControlID="Password">Contraseña</asp:Label>
               <div>
                  <asp:TextBox class="input_user" runat="server" ID="Password" TextMode="Password" />
               </div>
            </div>
            <div style="margin-bottom: 10px">
               <div>
                  <asp:Button class="submit_user" runat="server" OnClick="SignIn" Text="Log in" />
                   <hr/>
                 <a href="Register.aspx" class="link_formulario">Regístrate</a>
               </div>
            </div>
         </asp:PlaceHolder>
         <asp:PlaceHolder runat="server" ID="LogoutButton" Visible="false">
            <div>
               <div>
                   <a href="Portada.aspx">Ir a la página principal</a><hr />
                  <asp:Button runat="server" OnClick="SignOut" Text="Log out" />
               </div>       
                
            </div>
         </asp:PlaceHolder>          
      </div>
   </form>
</body>
</html>
