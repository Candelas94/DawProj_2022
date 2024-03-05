using Guitarras.Clases;
using Guitarras.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Guitarras.API
{
    public class MensajesController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
                //https://www.kafle.io/tutorials/asp-dot-net/how-to-create-live-chat-in-SignalR
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(string id)
        {
            //string[] datos = id.Split('&');

            //MensajesRepository mensajes = new MensajesRepository();
            //MensajesBD repobd = new MensajesBD();
            //mensajes.SetRepoMensajes(repobd);
            //List<CustomMensajes> resultado = mensajes.MostrarMensajes(datos[0], datos[1], Int32.Parse(datos[2]));
            //return resultado;
            ////return new List<CustomMensajes>();
            return string .Empty;
        }

        // POST api/<controller>
        public List<CustomMensajes> Post([FromBody] datosMensajes datos)
        {
            MensajesRepository mensajes = new MensajesRepository();
            MensajesBD repobd = new MensajesBD();
            mensajes.SetRepoMensajes(repobd);

            List<CustomMensajes> ret = new List<CustomMensajes>();

            if (datos.mensajes == null)
            {
                List<CustomMensajes> resultado = mensajes.MostrarMensajes(datos.id_owner, datos.id_interested, datos.id_producto, datos.sender);
                return resultado;
            }
            else
            {
                var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
                var currentUser = authenticationManager.User;
                var res = currentUser.Claims.Where(x => x.Type == "nombre");
                DateTime fecha = DateTime.Now;

                if (res.Any())
                {
                    string id_sender = res.First().Value;
                    mensajes.Insertar(datos.id_owner, datos.id_interested, datos.id_producto, datos.mensajes, fecha, datos.sender);
                }

                return ret;
            }
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

    public class datosMensajes
    {
        public string id_owner { get; set; }
        public string id_interested { get; set; }
        public int id_producto { get; set; }        
        public string mensajes { get; set; }
        public DateTime fecha { get; set; }
        public string sender { get; set; }
        public bool leido { get; set; }

    }


}