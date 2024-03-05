using Guitarras.Contest2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guitarras.Repository
{
    public class MensajesBD
    {
        ContextoGuitarras context = null;

        public MensajesBD()
        {
            context = new ContextoGuitarras(); // aqui hace la conexion y la bd esta rellenada
        }
        public List<Mensajes> MostrarMensajes(string id_owner, string id_interested, int id_producto, string sender)
        {
            List<Mensajes> item = context.Mensajes.Where(x => x.id_owner == id_owner && x.id_interested == id_interested && x.id_producto == id_producto).ToList();
            List<Mensajes> leido = context.Mensajes.Where(x => x.id_owner == id_owner && x.id_interested == id_interested && x.id_producto == id_producto && x.sender != sender).ToList();

            if (leido.Any())
            {
                foreach (Mensajes m in leido)
                {
                    m.leido = true;
                }

                context.SaveChanges();
            }
            return item;
        }
        public void Insertar(Mensajes mensaje)
        {
            context.Mensajes.Add(mensaje);
            context.SaveChanges();
        }

    }
}