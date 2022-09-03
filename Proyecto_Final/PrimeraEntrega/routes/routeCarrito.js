const { Router } = require('express')
const { Contenedor } = require('../public/js/contenedor')
const routerCarrito = Router()
const carrito = new Contenedor('./public/carrito.txt')
const productos = new Contenedor('./public/productos.txt')
let administrador = true

routerCarrito.post('/', async(req, res) => { //Recibe y agrega un carrito, y devuelve su id asignado
    let allCarrito = await carrito.getAll()
    let newId
    let fecha = new Date()

    if(allCarrito.length === 0){
        newId=1
    }else{
        newId = parseInt(allCarrito[allCarrito.length-1].id) + 1
    }

    allCarrito.push({id: newId, 'timestamp(carrito)': fecha, productos: []})
    await carrito.saveAll(allCarrito)
    res.send({id: newId})       
})

routerCarrito.delete('/:id', async(req, res) => { //Elimina un carrito según su id   
    let allCarrito = await carrito.getAll()  
    const iD = allCarrito.find(cart => cart.id === parseInt(req.params.id))

    if (!iD) {
        res.status(400).json({ error : "Carrito no encontrado" });
    } else {
        await carrito.deleteById(parseInt(req.params.id))
        allCarrito = await carrito.getAll()
        res.send(allCarrito)
    }   
})

routerCarrito.get('/:id/productos', async(req, res) => { //Devuelve los productos de un carrito segun su id
    let allCarrito = await carrito.getAll()
    const iD = allCarrito.find(cart => cart.id === parseInt(req.params.id))

    if (iD) {
        res.send(iD.productos)
    } else {
        res.status(400).json({ error : "Carrito no encontrado" });
    }   
})

routerCarrito.post('/:id/productos', async(req, res) => { //Incorporar productos al carrito por su id de producto
    let allCarrito = await carrito.getAll()
    
    const iDCart = allCarrito.find(cart => cart.id === parseInt(req.params.id))
    const indexCart = allCarrito.map(cart => cart.id).indexOf(parseInt(req.params.id))

    if (iDCart) {
        const { idProducto } = req.body
        let allProductos = await productos.getAll()
        const iD = allProductos.find(producto => producto.id === idProducto)

        if (iD) {
            allCarrito[indexCart].productos.push(iD)
            await carrito.saveAll(allCarrito)
            res.send(`Producto con ID: ${idProducto} agregado exitosamente al carrito con ID: ${req.params.id}`)    
        }else{
            res.status(400).json({ "error": "Ingrese el ID del producto" })
        }

    }else{
        res.status(400).json({ error : "Carrito no encontrado" });
    }   
})

routerCarrito.delete('/:id/productos/:id_prod', async(req, res) => { //Elimina un producto del carrito por su id de carrito y de producto
    let allCarrito = await carrito.getAll()
    const iDCart = allCarrito.find(cart => cart.id === parseInt(req.params.id))
    const indexCart = allCarrito.map(cart => cart.id).indexOf(parseInt(req.params.id))

    if (iDCart) {
        const arrayProd = allCarrito[indexCart].productos
        const iDProd = arrayProd.find(producto => producto.id === parseInt(req.params.id_prod))

        if (iDProd) {
            const filterId = arrayProd.filter((item) => item.id !== parseInt(req.params.id_prod))
            allCarrito[indexCart].productos = filterId
            await carrito.saveAll(allCarrito)
            res.send(`Producto Eliminado con exito`) 
        } else {
            res.status(400).json({ error : "Producto no encontrado" });
        } 
        
    }else{
        res.status(400).json({ error : "Carrito no encontrado" });
    }   
})

module.exports = routerCarrito