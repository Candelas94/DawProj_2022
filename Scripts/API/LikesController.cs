using Guitarras.Clases;
using Guitarras.Repository;
using Guitarras.RepositoryBD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Guitarras.API
{
    public class LikesController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public List<CustomLikes> Get(string id)
        {
            LikesRepository likes = new LikesRepository();
            LikesBD repobd = new LikesBD();
            likes.SetRepoLikes(repobd);
            List<CustomLikes> resultado = likes.MostrarLikes(id);
            return resultado;
        }

        // POST api/<controller>
        public void Post([FromBody] datosLikes datos)
        {
            LikesRepository likes = new LikesRepository();
            LikesBD repobd = new LikesBD();
            likes.SetRepoLikes(repobd);

            if(datos.delete == null) likes.InsertarLikes(datos.id_usuario, datos.id_producto); 
            else likes.DeleteLike(datos.id_usuario,datos.id_producto);            
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
           
        }
    }
    public class datosLikes
    {
        public string id_usuario { get; set; }
        public int id_producto { get; set; }
        public string delete { get; set; }
    }
}