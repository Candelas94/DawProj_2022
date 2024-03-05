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
    public class ErroresController : ApiController
    {
        // GET: api/Errores
        public List<Errores> Get()
        {
            Errores errores = new Errores();
            ErroresBD repoerrores = new ErroresBD();
            errores.SetRepoErrores(repoerrores);

            List<Errores> listaerrores = errores.MostrarErrores();
            return listaerrores;
        }

        // GET: api/Errores/5
        public string Get(string id)
        {
            string retorno = "";
            return retorno;
        }

        // POST: api/Errores
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Errores/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Errores/5
        public void Delete(int id)
        {
        }
    }
}
