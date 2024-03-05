using Guitarras.Clases;
using Guitarras.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guitarras.RepositoryBD
{
    public class ErroresBD
    {
        BD conexion = null;

        public ErroresBD() { conexion = new BD(); }

        public void Insertar( string sql)
        {
            conexion.conectar();
            conexion.Editar(sql);
            conexion.cerrar();
        }

        public List<Errores> MostrarErrores(string sql)
        {
            conexion.conectar();
            List<Errores> lista = conexion.MostrarErrores(sql);
            conexion.cerrar();
            return lista;
        }

    }
}