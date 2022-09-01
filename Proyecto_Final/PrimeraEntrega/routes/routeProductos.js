const { Router } = require('express')
const { Contenedor } = require('../public/js/contenedor')
const routerProductos = Router()
const productos = new Contenedor('./public/productos.txt')
let administrador = true
//const productos = []

routerProductos.get('/', async(req, res) => {  // Devuelve todos los productos.
    let allProductos = await productos.getAll()
    if(allProductos.length === 0){
        res.send({ "error" : "No existen productos" })    
    }else{
        res.send(allProductos)    
    }   
})

routerProductos.get('/:id', async(req, res) => { //Devuelve un producto según su id
    let allProductos = await productos.getAll()
    const iD = allProductos.find(producto => producto.id === parseInt(req.params.id));
    if (iD) {
        res.send(iD)
    } else {
        res.status(400).json({ error : "Producto no encontrado" });
    }   
})

routerProductos.post('/', async(req, res) => { //Recibe y agrega un producto, y lo devuelve con su id asignado
    if(administrador){
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        let allProductos = await productos.getAll()
        let newId
        let fecha = new Date()

        if(!nombre || !descripcion || !codigo || !foto || !precio || !stock){
            res.status(400).json({ "error": "Ingrese todos los datos del producto" });
        }

        if(allProductos.length === 0){
            newId=1
        }else{
            newId = parseInt(allProductos[allProductos.length-1].id) + 1
        }
        allProductos.push({id: newId, timestamp: fecha, nombre, descripcion, codigo, foto, precio, stock})
        await productos.saveAll(allProductos)
        res.send({id: newId, timestamp: fecha, nombre, descripcion, codigo, foto, precio, stock}) 
    }else{
        res.send({ error : -1,
                    descripcion: `ruta /api/productos/ método POST no autorizado`
                 })        
    }        
})

routerProductos.put('/:id', async(req, res) => { //Recibe y actualiza un producto según su id
    if(administrador){ 
        let allProductos = await productos.getAll()   
        const iD = allProductos.find(producto => producto.id === parseInt(req.params.id));
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        let fecha = new Date()

        if(!iD) {
            res.status(400).json({ error : "Producto no encontrado" });
        }else{
            if(!nombre || !descripcion || !codigo || !foto || !precio || !stock){
                res.status(400).json({ "error": "Ingrese todos los datos del producto" })
            }else{
                const newProducto = {
                    "id": parseInt(req.params.id),
                    "timestamp": fecha,
                    "nombre": nombre,
                    "descripcion": descripcion,
                    "codigo": codigo,
                    "foto": foto,
                    "precio": precio,
                    "stock": stock
                }
                await productos.putById(parseInt(req.params.id),newProducto)
                allProductos = await productos.getAll()
                res.send(allProductos[(parseInt(req.params.id)-1)])
            }    
        }
    }else{
        res.send({ error : -1,
                    descripcion: `ruta /api/productos/:id método PUT no autorizado`
                 })        
    }
})

routerProductos.delete('/:id', async(req, res) => { //Elimina un producto según su id   
    if(administrador){  
        let allProductos = await productos.getAll()  
        const iD = allProductos.find(producto => producto.id === parseInt(req.params.id));
        if (!iD) {
            res.status(400).json({ error : "Producto no encontrado" });
        } else {
            //const index = productos.findIndex(producto => producto.id === parseInt(req.params.id));
            //productos.splice(index, 1);
            await productos.deleteById(parseInt(req.params.id))
            allProductos = await productos.getAll()
            res.send(allProductos)
        } 
    }else{
        res.send({ error : -1,
                    descripcion: `ruta /api/productos/:id método DELETE no autorizado`
                 })        
    }    
})

module.exports = routerProductos