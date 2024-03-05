using Guitarras.Clases;
using Guitarras.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Guitarras.API
{
    public class ChatsController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public List<CustomChats> Get(string id)
        {
            ChatRepository chat = new ChatRepository();
            ChatsBD repobd = new ChatsBD();
            chat.SetRepoChat(repobd);
            List<CustomChats> resultado = chat.MostrarChats(id);

            return resultado;
        }

        // POST api/<controller>
        public void Post([FromBody] datosInsert datos)
        {
            ChatRepository chat = new ChatRepository();
            ChatsBD repobd = new ChatsBD();
            chat.SetRepoChat(repobd);        
            chat.Insertar(datos.id_owner, datos.id_interesado, datos.id_producto);
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

    public class datosInsert
    {
        public string id_owner { get; set; }
        public string id_interesado { get; set; }
        public int id_producto { get; set; }
    }


}