using Guitarras.Clases;
using Guitarras.Contest2;
using Guitarras.Repository;
using Guitarras.RepositoryBD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Guitarras.API {

    public class UsersController : ApiController {
        // GET api/<controller>
        public List<CustomUser> Get() 
        {
            Users usuario = new Users();
            UsersBD repobd = new UsersBD();
            usuario.SetRepoUsers(repobd);
            List < CustomUser > resultado = usuario.Mostrar();
            return resultado;
        }

        // GET api/<controller>/5
        public List<CustomUser> Get(string id) {
            Users usuario = new Users();
            UsersBD repobd = new UsersBD();
            usuario.SetRepoUsers(repobd);
            List<CustomUser> resultado = usuario.MostrarDatos(id);

            return resultado;
        }

        // POST api/<controller>
        public string Post([FromBody] datosUserInsert user) { // insertar

            Users usuario = new Users();
            UsersBD repobd = new UsersBD();
            usuario.SetRepoUsers(repobd);
            string id_usuario = "";
            id_usuario = usuario.Insertar(user.UserName, user.PhoneNumber, user.Email, user.Ciudad, user.Cod_postal, user.PasswordHash);
            return id_usuario;
        }

        // PUT api/<controller>/5
        public void Put(string id, [FromBody] datosUserInsert user) { // actualizar

            Users usuario = new Users();
            UsersBD repobd = new UsersBD();
            usuario.SetRepoUsers(repobd);

            if(user.rolCambio == "") usuario.Actualizar(id, user.UserName, user.PhoneNumber, user.Email, user.Ciudad, user.Cod_postal, user.PasswordHash);

            else usuario.CambiarRol(id, user.rolCambio);
        }

        // DELETE api/<controller>/5
        public void Delete(string id) {

            Users usuario = new Users();
            UsersBD repobd = new UsersBD();
            usuario.SetRepoUsers(repobd);

            usuario.Borrar(id);
        }
    }

    public class datosUserInsert {

        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Ciudad { get; set; }
        public string Cod_postal { get; set; }
        public string PasswordHash { get; set; }
        //public string rol { get; set; }
        public string rolCambio { get; set; }
    }


}