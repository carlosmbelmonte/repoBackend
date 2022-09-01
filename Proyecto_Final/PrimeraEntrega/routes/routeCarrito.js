const { Router } = require('express')
const { Contenedor } = require('../public/js/contenedor')
const routerCarrito = Router()
const carrito = new Contenedor('./public/carrito.txt')
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
    const iD = allCarrito.find(cart => cart.id === parseInt(req.params.id));
    if (!iD) {
        res.status(400).json({ error : "Carrito no encontrado" });
    } else {
        await carrito.deleteById(parseInt(req.params.id))
        allCarrito = await carrito.getAll()
        res.send(allCarrito)
    }   
})



module.exports = routerCarrito