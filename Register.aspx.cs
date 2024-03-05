
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
    public partial class Register : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {

        }
        protected void CreateUser_Click(object sender, EventArgs e) {
            // Default UserStore constructor uses the default connection string named: DefaultConnection

            List<AspNetUsers> coincideMail = new List<AspNetUsers>();
            List<AspNetUsers> coincideNombre = new List<AspNetUsers>();

            using(ContextoGuitarras bd = new ContextoGuitarras())
            {
                coincideMail = bd.AspNetUsers.Where(x => x.Email == mail.Text).ToList();
                coincideNombre = bd.AspNetUsers.Where(x => x.UserName == UserName.Text).ToList();
            }

            if(!coincideMail.Any() && !coincideNombre.Any())
            {
                Guid id_usuario = Guid.NewGuid();

                Utils hasheo = new Utils();
                string pass_hasheada = hasheo.hashear(Password.Text);

                AspNetUsers usuario = new AspNetUsers()
                {
                    UserName = UserName.Text,
                    Id = id_usuario.ToString(),
                    PhoneNumber = telefono.Text,
                    Email = mail.Text,
                    Ciudad = ciudad.Text,
                    Cod_postal = cod_postal.Text,
                    PasswordHash = pass_hasheada
                };

                int result = 0;

                using(ContextoGuitarras bd = new ContextoGuitarras())
                {
                    bd.AspNetUsers.Add(usuario);
                    result = bd.SaveChanges();
                }

                var claims = new List<Claim>();
                claims.Add(new Claim("nombre", usuario.UserName));
                claims.Add(new Claim("id_user", usuario.Id));
                claims.Add(new Claim("telefono", usuario.PhoneNumber));
                claims.Add(new Claim("pass", usuario.PasswordHash));
                claims.Add(new Claim("ciudad", usuario.Ciudad));
                claims.Add(new Claim("cod_postal", usuario.Cod_postal));
                claims.Add(new Claim("rol", "2"));

                if(result > 0)
                {
                    var userStore = new UserStore<IdentityUser>();
                    var manager = new UserManager<IdentityUser>(userStore);
                    var currentUser = manager.FindByName(usuario.UserName);                    
                    manager.AddToRole(currentUser.Id, "Public");

                    var ident = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
                    Context.GetOwinContext().Authentication.SignIn(new AuthenticationProperties { IsPersistent = false }, ident);

                    HttpCookie micookie = new HttpCookie("usuario", usuario.UserName);
                    Response.SetCookie(micookie);
                    HttpCookie micookie2 = new HttpCookie("id_usuario", usuario.Id);
                    Response.SetCookie(micookie2);

                    Response.Redirect("~/Portada.aspx");
                }
                else
                {
                    //StatusMessage.Text = result.Errors.FirstOrDefault();
                    StatusMessage.Text = "El e-mail ya está registrado";
                }
            }
            else { 
                    if(coincideMail.Any()) StatusMessage.Text = "El e-mail ya está registrado";
                    else StatusMessage.Text = "El nombre ya está registrado";

            }
        }
    }
}