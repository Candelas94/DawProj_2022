using Guitarras.Interfaces;
using Guitarras.RepositoryBD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guitarras.Repository
{
    public class Categorias
    {
        public string id_categoria;
        public string nombre_categoria;

        private CategoriasBD repocategoria = null;

        public Categorias() {}

        public Categorias(string id_categoria, string nombre_categoria) 
        {
            this.id_categoria = id_categoria;
            this.nombre_categoria = nombre_categoria;
        }

        public void SetRepoCategoria(CategoriasBD bbdd)
        {
            repocategoria = bbdd;
        }

        public List<Categorias> ListaCategorias()
        {
            string consulta = "select * from categorias";
            List<Categorias> registros = repocategoria.ListaCategorias(consulta);
            return registros;
        }

    }
}