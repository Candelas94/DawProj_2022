<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="Guitarras.Register" %>

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
                <div class="search"><i class="fa fa-search"></i> <input id="input_buscador_general" type="text" class="form-control" placeholder="Busca entre todas las categorías"/> </div>
            </div>
            </div> 
        </div>

    <form class="formulario_user" runat="server">
    <div>
        <h2>Regístrate:</h2>
        <hr />
        <p>
            <asp:Literal runat="server" ID="StatusMessage" />
        </p>                
        <div style="margin-bottom:10px">
            <asp:Label runat="server" AssociatedControlID="UserName" style="white-space:nowrap">Nombre de usuario:</asp:Label>
            <div>
                <asp:TextBox class="input_user" runat="server" ID="UserName" size="30"/>                
            </div>
        </div>
        <div style="margin-bottom:10px">
            <asp:Label runat="server" AssociatedControlID="Password" style="white-space:nowrap">Contraseña</asp:Label>
            <div>
                <asp:TextBox class="input_user" runat="server" ID="Password" TextMode="Password" />
            </div>
        </div>
        <div style="margin-bottom:10px">
            <asp:Label runat="server" AssociatedControlID="ConfirmPassword" style="white-space:nowrap">Confirma la contraseña</asp:Label>
            <div>
                <asp:TextBox class="input_user" runat="server" ID="ConfirmPassword" TextMode="Password" />
            </div>
        </div>

        <div style="margin-bottom:10px">
            <asp:Label runat="server" AssociatedControlID="telefono" style="white-space:nowrap">Número de teléfono</asp:Label>
            <div>
                <asp:TextBox class="input_user" runat="server" ID="telefono" />
            </div>
        </div>
        <div style="margin-bottom:10px">
            <asp:Label runat="server" AssociatedControlID="mail" style="white-space:nowrap">E-mail</asp:Label>
            <div>
                <asp:TextBox class="input_user" runat="server" ID="mail" />
            </div>
        </div>
        <div style="margin-bottom:10px">
            <asp:Label runat="server" AssociatedControlID="ciudad" style="white-space:nowrap">Ciudad</asp:Label>
            <div>
                <asp:TextBox class="input_user" runat="server" ID="ciudad" />
            </div>
        </div>
        <div style="margin-bottom:10px">
            <asp:Label runat="server" AssociatedControlID="cod_postal" style="white-space:nowrap">Código postal:</asp:Label>
            <div>
                <asp:TextBox class="input_user" runat="server" ID="cod_postal" />
            </div>
        </div>
        <div>
            <div>
                <asp:Button class="submit_user" runat="server" OnClick="CreateUser_Click" Text="Register" />
            </div>
            <hr />
            <a href="Login.aspx" class="link_formulario">O inicia sesión desde aquí</a>
        </div>
    </div>
    </form>
    
</body>
</html>
