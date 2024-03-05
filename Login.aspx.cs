using Guitarras.Contest2;
using Guitarras.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Guitarras {
    public partial class Login : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) 
        {
            if(!IsPostBack)
            {
                if(User.Identity.IsAuthenticated)
                {
                    Response.Redirect("Default.aspx");
                }
                else // SI NO ESTÁ AUTENTICADO
                {
                    HttpCookie usuario = new HttpCookie("usuario", ""); // CREO LA COOKIE USUARIO AGAIN Y LA ELIMINO
                    usuario.Secure = true;
                    usuario.Expires = DateTime.Now.AddDays(-1);
                    Response.Cookies.Add(usuario); // BORRO LA COOKIE

                    HttpCookie id_usuario = new HttpCookie("id_usuario", ""); // CREO LA COOKIE ID AGAIN Y LA ELIMINO
                    id_usuario.Secure = true;
                    id_usuario.Expires = DateTime.Now.AddDays(-1);
                    Response.Cookies.Add(id_usuario); // BORRO LA COOKIE

                    LoginForm.Visible = true;
                }
            }
        }

        protected void SignIn(object sender, EventArgs e) 
            {
            var userStore = new UserStore<IdentityUser>();
            var userManager = new UserManager<IdentityUser>(userStore);

            Utils hasheo = new Utils();
            string pass_hasheada = hasheo.hashear(Password.Text);

            AspNetUsers usuario = new AspNetUsers()
            {
                UserName = UserName.Text,
                PasswordHash = pass_hasheada
            };

            List<AspNetUsers> lista = new List<AspNetUsers>();            
            string rol = "";

            string id_usuario = "notset";

            using(ContextoGuitarras context = new ContextoGuitarras())
            {                
                lista = context.AspNetUsers.Where(x => x.UserName == usuario.UserName && x.PasswordHash == usuario.PasswordHash).ToList();

                if(lista.Any())
                {
                    var user = lista.FirstOrDefault(); 
                    rol = user.AspNetRoles.FirstOrDefault().Id; 
                    id_usuario = user.Id;
                }
            }

            if(lista.Any())
            {                

                if(rol == "1" || rol == "2")
                {
                    var claims = new List<Claim>();
                    claims.Add(new Claim("nombre", usuario.UserName));
                    claims.Add(new Claim("rol", rol));
                    claims.Add(new Claim("id_user", id_usuario));

                    var ident = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
                    Context.GetOwinContext().Authentication.SignIn(new AuthenticationProperties { IsPersistent = false }, ident);

                    HttpCookie micookie = new HttpCookie("usuario", usuario.UserName);
                    Response.SetCookie(micookie);
                    HttpCookie micookie2 = new HttpCookie("id_usuario", id_usuario);
                    Response.SetCookie(micookie2);

                    if (rol == "1")
                    {
                        Response.Redirect("~/Default.aspx");
                    }

                    else if(rol == "2") Response.Redirect("~/Portada.aspx"); 
                }

                else StatusText.Text = "Su usuario no está asociado a ningún rol válido, contacte con el administrador.";

            }
            else
            {
                StatusText.Text = "Invalid username or password.";
                LoginStatus.Visible = true;
            }
        }

        protected void SignOut(object sender, EventArgs e) {
            var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            authenticationManager.SignOut();
            Response.Redirect("~/Login.aspx");
        }



    }
}