using Guitarras.Contest2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guitarras.RepositoryBD {

    public class UsersBD {

        ContextoGuitarras context = null;

        public UsersBD() {

            context = new ContextoGuitarras(); // aqui hace la conexion y la bd esta rellenada
        }
        public List<AspNetUsers> Mostrar() {

            return context.AspNetUsers.ToList();
        }

        public List<AspNetUsers> MostrarDatos(string id)
        {
            List<AspNetUsers> item = context.AspNetUsers.Where(x => x.Id == id).ToList(); // usuario identificado
            //List<productos> prod = context.productos.Where(x => x.id_usuario == id).ToList(); // lista de todos los productos de este usuario            
            return item;
        }
        public void Insertar(AspNetUsers usuario/*, string rol*/) {

            var roleadmin = context.AspNetRoles.Where(x => x.Id == "2").First();
            usuario.AspNetRoles = new List<AspNetRoles>() { roleadmin };
            context.AspNetUsers.Add(usuario);
            context.SaveChanges();
        }

        public void Actualizar(string id, string nombre, string telefono, string mail, string ciudad, string cod_postal, string pass/*, string rol*/) 
        {
            var role = context.AspNetRoles.Where(x => x.Id == "2").First();

            var item = context.AspNetUsers.Find(id);
            item.UserName = nombre;
            item.PhoneNumber = telefono;
            item.Email = mail;
            item.Ciudad = ciudad;
            item.Cod_postal = cod_postal;
            item.PasswordHash = pass;

            var rolesusuario = item.AspNetRoles.ToList();

            foreach(var x in rolesusuario) // elimino los roles que tenga ese usuario
            {
                item.AspNetRoles.Remove(x); 
            }

            item.AspNetRoles = new List<AspNetRoles>() { role }; // añado el nuevo rol

            context.SaveChanges();
        }

        public void Borrar(string id) {

            var item = context.AspNetUsers.FirstOrDefault(x => x.Id == id);

            if(item != null)
            {
                context.AspNetUsers.Remove(item);
                context.SaveChanges();
            }
        }

        public void CambiarRol(string id, string rol) 
        {
            var role = context.AspNetRoles.Where(x => x.Id == rol).First();

            var item = context.AspNetUsers.Find(id);

            var rolesusuario = item.AspNetRoles.ToList();

            foreach(var x in rolesusuario) // elimino los roles que tenga ese usuario
            {
                item.AspNetRoles.Remove(x);
            }

            item.AspNetRoles = new List<AspNetRoles>() { role }; // añado el nuevo rol
            
            context.SaveChanges();

        }
    }
}