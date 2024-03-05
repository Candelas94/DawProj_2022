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
    public class FotosController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        // GET api/<controller>/5
        public List<CustomMultimedia> Get(string id)
        {
            Multimedia fotos = new Multimedia();
            MultimediaBD repobd = new MultimediaBD();
            fotos.SetRepoMultimedia(repobd);
            List<CustomMultimedia> resultado = fotos.MostrarFotos(id);
            return resultado;
        }

        // POST api/<controller>
        public void Post([FromBody] string value)
        {
            string aa = "holass";
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
            string aa = "holass";
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}