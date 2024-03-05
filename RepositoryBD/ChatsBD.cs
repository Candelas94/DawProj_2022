using Guitarras.Contest2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guitarras.Repository
{
    public class ChatsBD
    {
        ContextoGuitarras context = null;

        public ChatsBD()
        {
            context = new ContextoGuitarras(); // aqui hace la conexion y la bd esta rellenada
        }

        public List<Chats> MostrarChats(string id_usuario)
        {           
            List<Chats> item = context.Chats.Where(x => x.id_owner == id_usuario || x.id_interested == id_usuario).ToList();
            return item;
        }
        public void Insertar(Chats chat)
        {
            context.Chats.Add(chat);
            context.SaveChanges();
        }

    }
}