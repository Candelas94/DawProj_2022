using Microsoft.VisualStudio.TestTools.UnitTesting;
using Guitarras.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GuitarrasTests.FakeClases;
using Guitarras.Clases;
using Guitarras.Contest2;

namespace Guitarras.Repository.Tests
{
    [TestClass()]
    public class GuitarraTests
    {
        [TestMethod()]
        public void MostrarTest()
        {
            Guitarra guitarra = new Guitarra();
            FakeGuitarraBD fakebd = new FakeGuitarraBD();
            guitarra.SetRepoGuitarraEF(fakebd);

            List<CustomGuitarra> resultado = guitarra.Mostrar();
            List<CustomGuitarra> expected = fakebd.getproductosfake();

            CollectionAssert.AreEqual(expected, resultado);
        }

        [TestMethod()]
        public void Mostrar_Count_Test()
        {
            Guitarra guitarra = new Guitarra();
            FakeGuitarraBD fakebd = new FakeGuitarraBD();
            guitarra.SetRepoGuitarraEF(fakebd);

            int resultado = guitarra.Mostrar().Count;
            int expected = fakebd.getproductosfake().Count;
           
            Assert.AreEqual(expected, resultado);

        }

        //[TestMethod()]
        //public void MostrarGuitarraIDMalTest()
        //{
        //    Guitarra guitarra = new Guitarra();
        //    FakeGuitarraBD fakebd = new FakeGuitarraBD();
        //    guitarra.SetRepoGuitarra(fakebd);

        //    Guitarra resultado = guitarra.MostrarGuitarra("id", "MALO");
        //    Assert.IsNull(resultado);
        //}

        //[TestMethod()]
        //[DataRow("Gibson", "SG", "2000", "1", "INSERCIÓN CORRECTA", DisplayName ="guitarra_insercion_ok")]
        //[DataRow("", "SG", "2000", "1", "MARCA VACÍA O CAMPO DEL AÑO NO NUMÉRICO", DisplayName = "guitarra_insercion_marca_vacia")]
        //[DataRow("Gibson", "SG", "dos mil", "1", "MARCA VACÍA O CAMPO DEL AÑO NO NUMÉRICO", DisplayName = "guitarra_insercion_año_texto")]
        //public void InsertarTest(string marca, string modelo, string anyo,string categoria, string expected)
        //{
        //    Guitarra guitarra1 = new Guitarra();

        //    FakeGuitarraBD fakebd = new FakeGuitarraBD(); // establecemos el repositorio falso de guitarra

        //    guitarra1.SetRepoGuitarra(fakebd); // al objeto guitarra le aplicamos el metodo para establecer el repositorio de la base falsa

        //    string resultado = guitarra1.Insertar(marca , modelo, anyo, categoria);

        //    Assert.AreEqual(expected.ToString(), resultado.ToString());
        //}

        //[DataRow("3", "CAMPO ELIMINADO CON ÉXITO", DisplayName = "guitarra_borrar_ok")]
        //[DataRow("holass", "EL ID DEBE SER UN CAMPO NUMÉRICO", DisplayName = "guitarra_borrar_id_numerico")]
        //[TestMethod()]
        //public void BorrarTest(string id,string expected)
        //{
        //    Guitarra guitarra1 = new Guitarra();

        //    FakeGuitarraBD fakebd = new FakeGuitarraBD(); // establecemos el repositorio falso de guitarra

        //    guitarra1.SetRepoGuitarra(fakebd); // al objeto guitarra le aplicamos el metodo para establecer el repositorio de la base falsa

        //    string resultado = guitarra1.Borrar(id);
        //    //string expected = "CAMPO ELIMINADO CON ÉXITO";

        //    Assert.AreEqual(expected.ToString(), resultado.ToString());
        //}

        //[TestMethod()]
        //[DataRow("Gibson", "SG", "2000", "2", "1", "CAMPO ACTUALIZADO CON ÉXITO", DisplayName = "guitarra_actualizar_ok")]
        //[DataRow("", "SG", "2000", "2", "1", "CAMPO DEL AÑO NO NUMÉRICO O MARCA VACÍA", DisplayName = "guitarra_actualizar_marca_vacia")]
        //[DataRow("Gibson", "SG", "holass", "2", "1", "CAMPO DEL AÑO NO NUMÉRICO O MARCA VACÍA", DisplayName = "guitarra_actualizar_año_texto")]
        //[DataRow("Gibson", "SG", "2000", "", "1", "CAMPO DEL AÑO NO NUMÉRICO O MARCA VACÍA", DisplayName = "guitarra_actualizar_id_vacio")]
        //public void ActualizarTest(string marca, string modelo, string anyo, string id, string categoria, string expected)
        //{
        //    Guitarra guitarra1 = new Guitarra();

        //    FakeGuitarraBD fakebd = new FakeGuitarraBD(); // establecemos el repositorio falso de guitarra

        //    guitarra1.SetRepoGuitarra(fakebd); // al objeto guitarra le aplicamos el metodo para establecer el repositorio de la base falsa

        //    string resultado = guitarra1.Actualizar(marca, modelo, anyo, id, categoria);
        //    //string expected = "CAMPO ACTUALIZADO CON ÉXITO";

        //    Assert.AreEqual(expected.ToString(), resultado.ToString());
        //}       
    }
}