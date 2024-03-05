using Guitarras.Contest2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guitarras.RepositoryBD
{
    public class LikesBD
    {
        ContextoGuitarras context = null;

        public LikesBD()
        {
            context = new ContextoGuitarras(); // aqui hace la conexion y la bd esta rellenada
        }

        public List<Likes> MostrarLikes(string id_usuario)
        {
            List<Likes> item = context.Likes.Where(x => x.id_usuario == id_usuario).ToList();
            return item;
        }

        public void InsertarLikes(Likes like)
        {
            context.Likes.Add(like);
            context.SaveChanges();
        }
        public void DeleteLike(string id_usuario, int id_producto)
        {
            var item = context.Likes.FirstOrDefault(x => x.id_usuario == id_usuario && x.id_producto == id_producto);

            if (item != null)
            {
                context.Likes.Remove(item);
                context.SaveChanges();
            }
        }

    }
}