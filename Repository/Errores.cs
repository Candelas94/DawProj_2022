using Guitarras.RepositoryBD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guitarras.Repository
{
    public class Errores
    {
        public string id_error;
        public DateTime fecha;
        public string mensaje;
        public string metodo;
        public string clase;

        private ErroresBD repoerror = null;

        public Errores() { }

        public Errores(DateTime fecha, string mensaje, string metodo, string clase, string id_error)
        {
            this.id_error = id_error;
            this.fecha = fecha;
            this.mensaje = mensaje;
            this.metodo = metodo;
            this.clase = clase;
        }

        public void SetRepoErrores(ErroresBD bbdd)
        {
            repoerror = bbdd;
        }

        public List<Errores> MostrarErrores()
        {
            string consulta = "select * from log_errores order by fecha desc";
            List<Errores>  lista = repoerror.MostrarErrores(consulta);
            return lista;
        }       

        public void Insertar(DateTime fecha, string mensaje, string metodo, string clase)
        {
            string mensaje_escapado = mensaje.Replace("'", "\"");
            string consulta = "INSERT INTO log_errores (fecha, mensaje, metodo, clase) VALUES (' "+fecha+" ' ,' "+mensaje_escapado+" ' ,' "+metodo+" ' ,' "+clase+" ' )";
            repoerror.Insertar(consulta);
        }
      
    }
}