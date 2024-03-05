using Guitarras.Clases;
using Guitarras.Contest2;
using Guitarras.Repository;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Guitarras.RepositoryBD {
    public class MultimediaBD {

        public MultimediaBD() { context = new ContextoGuitarras(); }
        ContextoGuitarras context = null;

        public List<fotos> MostrarFotos(string id_producto) 
        {
            int id = Int32.Parse(id_producto);
            List<fotos> lista = context.fotos.Where(x => x.id_producto == id).ToList();
            return lista;
        }

        public void InsertarFotos(fotos foto) 
        {
            context.fotos.Add(foto);
            context.SaveChanges();         
        }

        public void BorrarFoto(string sql) 
        {
            //conexion.conectar();
            //conexion.Editar(sql);
            //conexion.cerrar();
        }

    }
        
}