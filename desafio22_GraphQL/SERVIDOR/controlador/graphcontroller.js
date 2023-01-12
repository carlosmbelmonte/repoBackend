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
    getProductos: [Producto],
  }
  type Mutation {
    postProducto(objeto: ProductosInput): Retorno
    putProducto(id: Int, objeto: ProductosInput): Respuesta,
    deleteProductoId(id: Int): Respuesta,
  }
`)

const getProductos = async () => { 
    try {
        const allProductos = await productos.getAll()                 
        return allProductos                                                     
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const postProducto = async ({ objeto }) => { 
  try {
      let allProductos = await productos.save({'timestamp_producto': new Date(),...objeto})                 
      return {id: parseInt(allProductos)}                                                     
  } catch (error) {
      console.error(`El error es: ${error}`)
  }
}

const putProducto = async (data) => { 
  try {
      let idProducts = await productos.putById(parseInt(data.id),{'timestamp_producto': new Date(), ...data.objeto})                
      return idProducts                                                    
  } catch (error) {
      console.error(`El error es: ${error}`)
  }
}

const deleteProductoId = async (data) => { 
  try {
      let idProducts = await productos.deleteById(parseInt(data.id))                
      return idProducts                                                    
  } catch (error) {
      console.error(`El error es: ${error}`)
  }
}

const graphqlProductos = graphqlHTTP({
    schema: schema,
    rootValue: {
        getProductos: getProductos,
        postProducto: postProducto,
        putProducto: putProducto,
        deleteProductoId: deleteProductoId
    },
    graphiql: true,
})

module.exports={
  graphqlProductos
}
