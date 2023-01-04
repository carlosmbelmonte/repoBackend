const { Router } = require('express')
const routerProductos = Router()

const productos = require('../persistencia/daos/DaoFactory').ProductosDaoFactory.getProductoDao()

routerProductos.get('/', async(req, res) => {  // Devuelve todos los productos   
    let allProducts = await productos.getAll()
    res.send(allProducts)     
})

module.exports = {
    routerProductos: routerProductos
}