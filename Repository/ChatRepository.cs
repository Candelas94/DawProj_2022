using Guitarras.Clases;
using Guitarras.Contest2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guitarras.Repository
{
    public class ChatRepository
    {

        private ChatsBD repochats = null;

        public void SetRepoChat(ChatsBD bbdd)
        {
            repochats = bbdd;
        }

        public List<CustomChats> MostrarChats(string id_usuario)
        {
            repochats = new ChatsBD();

            List<Chats> resultado = repochats.MostrarChats(id_usuario); // obtengo una lista de usuarios de la tabla
            List<CustomChats> lista = new List<CustomChats>();  // creo una lista custom

            foreach (Chats item in resultado)
            {
                CustomChats usuario = new CustomChats(item); // relleno un customuser con el contenido del aspnetusers
                lista.Add(usuario); // lo añado a la lista del customuser, de forma individual por cada uno
            }

            return lista;
        }

        public void Insertar(string id_owner, string id_interesado, int id_producto)
        {

            repochats = new ChatsBD();

            Chats chat = new Chats()
            {
                id_owner = id_owner,
                id_interested = id_interesado,
                id_producto = id_producto
            };

            repochats.Insertar(chat);

        }

    }
}