using Guitarras.Clases;
using Guitarras.Contest2;
using Guitarras.Interfaces;
using Guitarras.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GuitarrasTests.FakeClases
{
    class FakeGuitarraBD : InstrumentoBD
    {
        public FakeGuitarraBD()
        {
        }

        public bool lanzaExcepcion = false;

        public string Insertar(productos producto)
        {
            if (lanzaExcepcion) throw new NotImplementedException();

            string str = "INSERCIÓN CORRECTA";
            return str;
        }

        public string Borrar(string id)
        {
            string str = "CAMPO ELIMINADO CON ÉXITO";
            return str;
        }
        public string Actualizar(string marca, string modelo, string anyo, string id, string categoria, string precio, string estado, string descripcion)
        {
            string str = "CAMPO ACTUALIZADO CON ÉXITO";
            return str;
        }

        List<productos> lista = new List<productos>() 
        { 
        new productos() {
            precio = 666,
            estado = "bueno",
            descripcion = "DESCRIPCIONES",
            categoria = 1,
            anyo = 2000,
            marca = "gibson",
            modelo = "SG",
            id_producto = 1,
            id_usuario = "UTF-8",
            AspNetUsers = new AspNetUsers(){UserName="Javi" }
        },
        new productos()
        {
            precio = 6666,
            estado = "malo",
            descripcion = "DESCRIPCIONES",
            categoria = 2,
            anyo = 2000,
            marca = "gibson",
            modelo = "Les Paul",
            id_producto = 2,
            id_usuario = "UTF-8",
            AspNetUsers = new AspNetUsers(){UserName="Candelas" }
        }
        };       

        public List<CustomGuitarra> getproductosfake()
        {
            List<CustomGuitarra> retorno = new List<CustomGuitarra>() { };

            foreach (productos c in lista)
            {
                CustomGuitarra prod = new CustomGuitarra(c);
                retorno.Add(prod);
            }
            return retorno;
        }

        public List<productos> Mostrar()
        {
            return lista;
        }

        public int GetMaxIdGuitarra()
        {
            int id_guitarra = 16;
            return id_guitarra;
        }

        public string Categorias(string sql)
        {
            string str = "Acustica // Electrica // Semi-Hollow // Clasica //";
            return str;
        }
    }
}
