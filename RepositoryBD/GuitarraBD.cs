using Guitarras.Clases;
using Guitarras.Contest2;
using Guitarras.Interfaces;
using Guitarras.Repository;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Guitarras.RepositoryBD
{
    public class GuitarraBD:InstrumentoBD
    {

        ContextoGuitarras context = null;

        public GuitarraBD()
        {
            context = new ContextoGuitarras(); // aqui hace la conexion y la bd esta rellenada
        }

        //public GuitarraBD() { conexion = new BD(); }

        public string Insertar(productos producto)
        {           
            context.productos.Add(producto);
            var resultsave = context.SaveChanges();

            string str = "";
            return str;
        }

        public string Borrar(string id)
        {

            int id_prod = Int32.Parse(id);
            var consulta_producto = context.productos.Where(x => x.id_producto == id_prod);

            if (consulta_producto.Any())
            {
                productos producto = consulta_producto.First();
                context.productos.Remove(producto);
                context.SaveChanges();
            }

            string str = "";
            return str;
        }

        public string Actualizar(string marca, string modelo, string anyo, string id, string categoria, string precio, string estado, string descripcion)
        {
            int id_prod = Int32.Parse(id);
            var consulta_producto = context.productos.Where(x => x.id_producto == id_prod);

            if (consulta_producto.Any())
            {
                productos producto = consulta_producto.First();
                producto.marca = marca;
                producto.modelo = modelo;
                producto.anyo = Int32.Parse(anyo);
                producto.precio = Double.Parse(precio);
                producto.categoria = Int32.Parse(categoria);
                producto.estado = estado;
                producto.descripcion = descripcion;

                context.SaveChanges();
            }
            string str = "";
            return str;
        }

        public List<productos> Mostrar()
        {
            return context.productos.ToList();
        }     
        
        public int GetMaxIdGuitarra ()
        {
            int id_guitarra = context.productos.Max(p => p.id_producto);
            return id_guitarra;
        }

    }
}