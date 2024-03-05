using Guitarras.Clases;
using Guitarras.Contest2;
using Guitarras.Repository;
using Guitarras.RepositoryBD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Guitarras.API
{
    public class GuitarraController : ApiController
    {
        //GET api/<controller>
        [HttpGet]
        public responseCrearGuitarras Get()
        {
            Guitarra guitarra = new Guitarra(); // instancio un objeto de la clase guitarra
            Categorias categorias = new Categorias(); // otro con las categorías

            CategoriasBD repocategorias = new CategoriasBD();
            categorias.SetRepoCategoria(repocategorias);
                                                           // establezco los repositorios para la conexión con la bd
            GuitarraBD repobd = new GuitarraBD();
            guitarra.SetRepoGuitarraEF(repobd);
            responseCrearGuitarras listas = new responseCrearGuitarras(); // creo el objeto que me permite devolver datos de dos tablas distintas
                                                                            // para arrojarlas al front.
            try
            {               
                listas.listaguitarras = guitarra.Mostrar();
            }
            catch (Exception e)
            {
                Errores error = new Errores();
                ErroresBD bbdd = new ErroresBD();
                error.SetRepoErrores(bbdd);
                DateTime fecha = DateTime.Now;
                string mensaje = e.Message;
                string metodo = "Get";
                string clase = "ControllerGuitarra";
                error.Insertar(fecha, mensaje, metodo, clase);
            }

            try
            {
                listas.listacategorias = categorias.ListaCategorias();
            }

            catch (Exception e)
            {
                Errores error = new Errores();
                ErroresBD bbdd = new ErroresBD();
                error.SetRepoErrores(bbdd);
                DateTime fecha = DateTime.Now;
                string mensaje = e.Message;
                string metodo = "Get";
                string clase = "ControllerGuitarra";
                error.Insertar(fecha, mensaje, metodo, clase);
            }

            return listas;
        }

        // GET api/<controller>/5
        //public Guitarra Get(string id)
        //{
        //    Guitarra guitarra = new Guitarra();
        //    GuitarraBD repobd = new GuitarraBD();
        //    guitarra.SetRepoGuitarra(repobd);

        //    Guitarra resultado = null;

        //    try
        //    {
        //        resultado = guitarra.MostrarGuitarra(id);
        //    }
        //    catch (Exception e)
        //    {
        //        Errores error = new Errores();
        //        ErroresBD bbdd = new ErroresBD();
        //        error.SetRepoErrores(bbdd);
        //        DateTime fecha = DateTime.Now;
        //        string mensaje = e.Message;
        //        string metodo = "Get / id";
        //        string clase = "ControllerGuitarra";
        //        error.Insertar(fecha, mensaje, metodo, clase);
        //    }

        //    if (resultado == null) return null;
        //    else return guitarra.MostrarGuitarra(id);
        //}

        //POST api/<controller>/insertar;
        
        [HttpPost]
        public responseInsert Post([FromBody] paramRequest nombre) // INSERTAR
        {
            Guitarra guitarra = new Guitarra();
            GuitarraBD repobd = new GuitarraBD();
            responseInsert inserts = new responseInsert();
            guitarra.SetRepoGuitarraEF(repobd);

            try
            {
               productos producto_insertado = guitarra.Insertar(nombre.marca, nombre.modelo, nombre.anyo, nombre.precio, nombre.descripcion, nombre.estado, nombre.categoria, nombre.id_usuario);
                if (producto_insertado.id_producto > 0)
                    inserts.mensaje = "INSERCION CORRECTA";
                else inserts.mensaje = "ERROR AL INSERTAR";
                inserts.id = producto_insertado.id_producto;
            }

            catch (Exception e)
            {
                Errores error = new Errores();
                ErroresBD bbdd = new ErroresBD();
                error.SetRepoErrores(bbdd);
                DateTime fecha = DateTime.Now;
                string mensaje = e.Message;
                string metodo = "Post (insertar)";
                string clase = "ControllerGuitarra";
                error.Insertar(fecha, mensaje, metodo, clase);
            }                  
            return inserts;

            // SEGUIR PONIENDOLE EL MÉTODO ESTE PARA SACAR EL MAX Y ADEMÁS HACER LO DEL PARAMETER REQUEST ESTE
        }

        // PUT api/<controller>/5
        public string Put(string id, [FromBody] paramRequest nombre) //ACTUALIZAR
        {
            Guitarra guitarra = new Guitarra();
            GuitarraBD repobd = new GuitarraBD();
            guitarra.SetRepoGuitarraEF(repobd);
            string respuesta = "";

            try
            {
                respuesta = guitarra.Actualizar(nombre.marca, nombre.modelo, nombre.anyo, id, nombre.categoria, nombre.precio, nombre.estado, nombre.descripcion);
            }

            catch (Exception e)
            {
                Errores error = new Errores();
                ErroresBD bbdd = new ErroresBD();
                error.SetRepoErrores(bbdd);
                DateTime fecha = DateTime.Now;
                string mensaje = e.Message;
                string metodo = "Actualizar";
                string clase = "ControllerGuitarra";
                error.Insertar(fecha, mensaje, metodo, clase);
            }

            return respuesta;
        }

        // DELETE api/<controller>/5
        public string Delete(string id)
        {
            Guitarra guitarra = new Guitarra();
            GuitarraBD repobd = new GuitarraBD();
            guitarra.SetRepoGuitarraEF(repobd);
            string respuesta = "";
            try
            {
                respuesta = guitarra.Borrar(id);
            }
            catch (Exception e)
            {
                Errores error = new Errores();
                ErroresBD bbdd = new ErroresBD();
                error.SetRepoErrores(bbdd);
                DateTime fecha = DateTime.Now;
                string mensaje = e.Message;
                string metodo = "Deleete";
                string clase = "ControllerGuitarra";
                error.Insertar(fecha, mensaje, metodo, clase);
            }
            return respuesta; 
        }
    }
        public class paramRequest
        {
            public string marca { get; set; }
            public string modelo { get; set; }
            public string anyo { get; set; }
            public string precio { get; set; }
            public string descripcion { get; set; }
            public string estado { get; set; }
            public string categoria { get; set; }
            public string id_usuario { get; set; }
        }

        public class responseCrearGuitarras
        {
            public List<CustomGuitarra> listaguitarras { get; set; }
            public List<Categorias> listacategorias { get; set; }
        }

        public class responseInsert
        {
            public string mensaje { get; set; }
            public int id { get; set; }
        }
}