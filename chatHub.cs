using Guitarras.Contest2;
using Guitarras.Repository;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guitarras
{
    public class chatHub : Hub
    {
        public void Send(string name, string message, string owner, string interested, int producto, string grupo)
        {
            List<Chats> item = new List<Chats>();

            using (ContextoGuitarras context = new ContextoGuitarras())
            {
               item = context.Chats.Where(x => x.id_owner == owner && x.id_interested == interested && x.id_producto == producto).ToList();
            }

            if (!item.Any()) // si previamente no existe una conversación entre estos dos usuarios con este producto, la creo
            {
                ChatRepository chat = new ChatRepository();
                ChatsBD repochat = new ChatsBD();
                chat.SetRepoChat(repochat);
                chat.Insertar(owner, interested, producto);
            }

            Clients.OthersInGroup(grupo).recibir(name, message);
        }
        
        public void Conectar(string grupo)
        {
            string[] parametros = grupo.Split('&');
            Groups.Add(Context.ConnectionId, parametros[0] + "&" + parametros[1] + "&" + parametros[2]);     
            
        }
    }
}