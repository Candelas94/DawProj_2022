using Guitarras.Clases;
using Guitarras.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guitarras.RepositoryBD
{
    public class CategoriasBD
    {
        BD conexion = null;

        public CategoriasBD() { conexion = new BD(); }

        public List<Categorias> ListaCategorias(string sql)
        {
            conexion.conectar();
            List<Categorias> lista = conexion.ListaCategorias(sql);
            conexion.cerrar();
            return lista;
        }


    }
}