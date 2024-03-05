<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Guitarras._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <%--<form id="" runat="server">
    <asp:PlaceHolder runat="server" ID="LogoutButton" Visible="false">
            <div>
               <div>
                  <asp:Button runat="server" OnClick="SignOut" Text="Log out" />
               </div>
            </div>
     </asp:PlaceHolder>   
     </form>--%>
   
    <h1 class="display-1">PANEL DE ADMINISTRACIÓN</h1> 

    <div id="panel-admin">
            <ul>
            <li><a href="#pestanya_productos">Tabla productos</a></li>
            <li><a href="#pestanya_errores">Tabla errores</a></li>
            <li><a href="#pestanya_usuarios">Usuarios</a></li>
            <li><a href="#pestanya_logout">Cerrar sesión</a></li>
            </ul>

        <div id="pestanya_logout"> <form id="Logout"><input type="submit" class="btn" id="logoutbutton" value ="CERRAR SESIÓN"/> </form></div>
       
            <div id ="pestanya_productos">

                <%-- /////////   TABLA DE PRODUCTOS   ///////////--%>

                <div class="jumbotron">
                    <table class="tabla" id="tabla_productos">           
                        <tr class="head"><th>MARCA</th><th>MODELO</th><th>AÑO</th><th>PRECIO</th><th>DESCRIPCION</th><th>ESTADO</th><th>CATEGORÍA</th><th>PROPIETARIO</th></tr>
                        <tbody class="cuerpotabla"></tbody>
                    </table>
                    <br />
        
                    <div id="botonera">
                        <button id="borrar" class="ui-button">BORRAR</button>
                        <button class="ui-button" id="insertar">NUEVO</button>
                        <button class="ui-button" id="editar">EDITAR</button>
                    </div>
                </div>

            </div> <%--FINAL DEL DIV DE PRODUCTOS--%>

                <%-- ///////////    TABLA ERRORES     ///////////--%>
           
            <div id="pestanya_errores">

                <h3>FILTROS:</h3><br>
                
                <div id="filtros">                    
                    <div><label>Fecha inicial:</label><input type="text" id="filtro_fecha_ini" size="9"/></div>
                    <div><label>Fecha de fin:</label><input type="text" id="filtro_fecha_fin"  size="9"/></div>
                    <div><label>Por método:</label><input type="text" id="filtro_metodo"/> </div>
                    <div><label>Por clase:</label><input type="text" name="metodo" id="filtro_clase"/> </div>
                    <div><label>Por mensaje:</label><input type="text" id="filtro_mensaje"/> </div>
                    <div><label>Por ID:</label><input type="text" id="filtro_id"/></div>
                    <button id="reiniciar_filtros">REINICIAR FILTROS</button>
                </div>
                   
                <div class="jumbotron">
                <table id="tabla_errores">           
                    <tr class="head"><th>FECHA</th><th>METODO</th><th>CLASE</th><th>MENSAJE</th><th>ID_ERROR</th></tr>
                    <tbody class="cuerpotabla_errores"></tbody>
                </table>
                <br />                
                </div>

            </div> <%--FINAL DEL DIV ERRORES--%>

  <%--   //////////////////////  PESTAÑA DE USUARIOS ///////////////////--%>

    <div id="pestanya_usuarios">

                    <div class="jumbotron">
                    <table id="tabla_usuarios" class="hover"></table>
                    <div id="botonera_usuarios"></div>
                        <button id="borrar_usuario" class="ui-button">BORRAR</button>
                        <button class="ui-button" id="boton_insertar">NUEVO</button>
                        <button class="ui-button" id="boton_editar">EDITAR</button>
                    </div>
        </div>


   <%-- ////////////////////// FIN  PESTAÑA DE USUARIOS ///////////////////--%>

         </div> <%--FINAL DEL PANEL DE ADMIN--%>



    <%-- /////////////////////   FORMULARIOS DE INSERT Y UPDATE   ////////////////////////////////// --%>

                <div class="jumbotron" id="formedit" title="EDITAR GUITARRA">
                        <label class="adminlabel" for="marca">Marca:</label>
                        <input type="text" id="marcaedit" name="marcaedit"><br />
                        <label class="adminlabel"for="modelo">Modelo:</label>
                        <input type="text" id="modeloedit" name="modeloedit"><br />
                        <label class="adminlabel" for="anyo">Año:</label>
                        <input type="text" id="anyoedit" name="anyoedit"><br />
                        <label class="adminlabel"  for="categoria">Precio:</label>
                        <input type="text" id="precioedit" name="precioedit"><br />
                        <label class="adminlabel"  for="categoria">Descripcion:</label>
                        <input type="text" id="descripcionedit" name="descripcionedit"><br />
                        <label class="adminlabel"  for="categoria">Estado:</label>
                        <input type="text" id="estadoedit" name="estadoedit"><br />
                        <label class="adminlabel"  for="categoria">Categoría:</label>
                        <select name ="categoria" id="optionscategorias">
                        </select><br />
                        <label class="adminlabel"  for="propietario">Propietario:</label>
                        <input type="text" id="propietarioedit" name="propietario" disabled><br />
          
                        <button class="ui-button ui-widget ui-corner-all botonenviar" id="editbutton">
                            ENVIAR<span class="ui-icon  ui-icon-plusthick"></span>
                        </button>
                </div>

                <div class="jumbotron" id="formnuevo" title="NUEVA GUITARRA">
                        <label class="adminlabel" >Marca:</label>
                        <input type="text" id="marcainsert" name="marca"><br/>
                        <label class="adminlabel" >Modelo:</label>
                        <input type="text" id="modeloinsert" name="modelo"><br/>
                        <label class="adminlabel" >Año:</label>
                        <input type="text" id="anyoinsert" name="anyo"><br/>
                        <label class="adminlabel" for="categoria">Precio:</label>
                        <input type="text" id="precioinsert" name="precioinsert"><br />
                        <label class="adminlabel" for="categoria">Descripcion:</label>
                        <input type="text" id="descripcioninsert" name="descripcioninsert"><br />
                        <label class="adminlabel" for="categoria">Estado:</label>
                        <input type="text" id="estadoinsert" name="estadoinsert"><br />
                        <label class="adminlabel" for="categoria">Categoría:</label>
                        <select name ="categoria" id="optionscategoriasinsert">
                        </select><br />
                        <label class="adminlabel" for="categoria">Propietario:</label>
                        <input type="text" id="propietarioinsert" name="propietarioinsert"><br />
                        <button class="ui-button ui-widget ui-corner-all botonenviar" id="insertbutton">
                            ENVIAR<span class="ui-icon  ui-icon-plusthick"></span>
                        </button>
                </div>   

                    <%--///////////////////// //////////   PESTAÑA USUARIOS ////////////////////////////////////--%>

        
        
                    <div hidden id="nuevo_usuario" title="NUEVO USUARIO">
                        <label class="adminlabel" >ID:</label>
                        <input type="text" id="new_id_usuario" disabled><br/>
                        <label class="adminlabel" >Nombre:</label>
                        <input type="text" id="new_nombre_usuario"><br/>
                        <label class="adminlabel" >E-mail</label>
                        <input type="text" id="new_mail_usuario"><br/>

                        <label class="adminlabel" >Contraseña</label>
                        <input type="password" id="new_pass"><input style="margin-left:20px;" type="checkbox" onchange="togglePassword(this, 'new_pass')" /> Ver<br/>

                        <label class="adminlabel" >Repite contraseña:</label>
                        <input type="password" id="new_pass_confirm"><input style="margin-left:20px;" type="checkbox" onchange="togglePassword(this, 'new_pass_confirm')"/> Ver<br/>

                        <label class="adminlabel" >Teléfono:</label>
                        <input type="text" id="new_numero_usuario"><br/>
                        <label class="adminlabel" >Ciudad:</label>
                        <input type="text" id="new_ciudad_usuario"><br/>
                        <label class="adminlabel" >Código postal:</label>
                        <input type="text" id="new_cod_postal_usuario"><br/>                       
                        <button class="ui-button ui-widget ui-corner-all botonenviar" id="insertar_usuario">
                            ENVIAR<span class="ui-icon  ui-icon-plusthick"></span>
                        </button>
                    </div>

                    <div hidden id="actualizar_usuario" title="EDITAR USUARIO">
                        <label class="adminlabel" >ID:</label>
                        <input type="text" id="edit_id_usuario" disabled><br/>
                        <label class="adminlabel" >Nombre:</label>
                        <input type="text" id="edit_nombre_usuario"><br/>
                        <label class="adminlabel" >E-mail</label>
                        <input type="text" id="edit_mail_usuario"><br/>

                        <label class="adminlabel" >Contraseña</label>
                        <input type="password" id="edit_pass"><input style="margin-left:20px;" type="checkbox" onchange="togglePassword(this, 'edit_pass')" /> Ver<br/>

                        <label class="adminlabel" >Repite contraseña:</label>
                        <input type="password" id="edit_pass_confirm"><input style="margin-left:20px;" type="checkbox" onchange="togglePassword(this, 'edit_pass_confirm')"/> Ver<br/>

                        <label class="adminlabel" >Teléfono:</label>
                        <input type="text" id="edit_numero_usuario"><br/>
                        <label class="adminlabel" >Ciudad:</label>
                        <input type="text" id="edit_ciudad_usuario"><br/>
                        <label class="adminlabel" >Código postal:</label>
                        <input type="text" id="edit_cod_postal_usuario"><br/>                        
                        <button class="ui-button ui-widget ui-corner-all botonenviar" id="editar_usuario">
                            ENVIAR<span class="ui-icon  ui-icon-plusthick"></span>
                        </button>
                    </div>





                <%-- ////////////////////////////   CUADROS DE DIÁLOGO EN HIDDEN   ///////////////////////////////--%>                                   
                
                <div id="modal_subir" class="oculto">
                    <button id="cerrar_modal">x</button>
                      <form id="formulario_foto" method="post" EncType="multipart/form-data">
                                  Sube una o varias imagenes: <input  id="oFile" type="file" NAME="oFile">
                                  <input id="id_producto_foto" type="text" name="id_producto" />
                                  <input id="btnUpload" type="submit" value="subir"/>
                                  <Label id="lblUploadResult"></Label>
                       </form>
                </div>                                     

                <div hidden id="confirmar-borrar" title="¿Seguro que quieres borrar el elemento?">
                    <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Estos items serán borrados permanentemente y no se podrán recuperar. Are you sure?</p>
                </div>

                <div hidden id="confirmar-insertar" title="¿Seguro que quieres crear el nuevo elemento?">
                    <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>¿Está seguro? Revise los cambios antes de continuar.</p>
                </div>

                <div hidden id="confirmar-editar" title="¿Seguro que quieres borrar el elemento?">
                    <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Estos items serán actualizados permanentemente y no se podrán recuperar. Revise los campos antes de continuar.</p>
                </div>

                <div hidden id="dialogo-correcto" title="MENSAJE">      
                </div>

                <div hidden id="dialogo-incorrecto" title="ERROR!"> 
                    <p>DISCULPE, HA SURGIDO UN PROBLEMA.</p><br />
                    <p>SI TIENE ALGUNA QUEJA, QUE SE LA PIQUE UN POLLO</p>
                </div>

  
</asp:Content>
