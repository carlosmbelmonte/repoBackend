const { Router } = require('express')
const routerProductos = Router()

const productos = require('../persistencia/daos/DaoFactory').ProductosDaoFactory.getProductoDao()

routerProductos.get('/', async(req, res) => {  // Devuelve todos los productos   
    let allProducts = await productos.getAll()
    res.send(allProducts)     
})

routerProductos.post('/', async(req, res) => {  // Devuelve el ID del producto agregado   
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body
    if(!nombre || !descripcion || !codigo || !foto || !precio || !stock){
        res.status(400).json({ "error": "Ingrese todos los datos del producto" });
    }else{
        let idProducts = await productos.save({'timestamp_producto': new Date(), nombre, descripcion, codigo, foto, precio, stock})    
        res.send({id:idProducts})     
    }  
})

routerProductos.delete('/:id', async(req, res) => {  // Elimina un producto por ID  
    let allProducts = await productos.deleteById(parseInt(req.params.id))
    res.send(allProducts)     
})

routerProductos.put('/:id', async(req, res) => {  // Recibe y actualiza un producto según su id   
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body
    if(!nombre || !descripcion || !codigo || !foto || !precio || !stock){
        res.status(400).json({ "error": "Ingrese todos los datos del producto" });
    }else{
        let idProducts = await productos.putById(parseInt(req.params.id),{'timestamp_producto': new Date(), nombre, descripcion, codigo, foto, precio, stock})    
        res.send(idProducts)     
    }  
})

module.exports = {
    routerProductos: routerProductos
}