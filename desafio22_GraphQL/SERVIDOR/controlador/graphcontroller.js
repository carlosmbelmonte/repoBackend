const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const productos = require('../persistencia/daos/DaoFactory').ProductosDaoFactory.getProductoDao()

const schema = buildSchema(`
  input ProductosInput {
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: String,
    stock: String
  }
  type Producto {
    id: Int
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: String,
    stock: String,
    timestamp_producto: String
  }
  type Respuesta {
    respuesta: String
  }
  type Retorno {
    id: Int
  }
  type Query {
    getProducts: [Producto],
  }
  type Mutation {
    postProduct(datos: ProductosInput): Retorno
    putProduct(id: Int, datos: ProductosInput): Respuesta,
    deleteByIdProduct(id: Int): Respuesta,
  }
`)

const getProducts = async () => { 
    try {
        const allProductos = await productos.getAll()                 
        return allProductos                                                     
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const graphqlProductController = graphqlHTTP({
    schema: schema,
    rootValue: {
        getProducts: getProducts,
    },
    graphiql: true,
})

module.exports={
    graphqlProductController
}
