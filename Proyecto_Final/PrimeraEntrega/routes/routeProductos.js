const { Router } = require('express')
const routerProductos = Router()
let administrador = true
const productos = []

routerProductos.get('/', (req, res) => {  // Devuelve todos los productos.
    if(productos.length === 0){
        res.send({ "error" : "No existen productos" })    
    }else{
        res.send(productos)    
    }   
})

routerProductos.get('/:id', (req, res) => { //Devuelve un producto según su id
    const iD = productos.find(producto => producto.id === parseInt(req.params.id));
    if (iD) {
        res.send(iD)
    } else {
        res.status(400).json({ error : "Producto no encontrado" });
    }   
})

routerProductos.post('/', (req, res) => { //Recibe y agrega un producto, y lo devuelve con su id asignado
    if(administrador){
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        let newId
        let fecha = new Date()

        if(!nombre || !descripcion || !codigo || !foto || !precio || !stock){
            res.status(400).json({ "error": "Ingrese todos los datos del producto" });
        }

        if(productos.length === 0){
            newId=1
        }else{
            newId = productos.length + 1
        }
        productos.push({id: newId, timestamp: fecha, nombre, descripcion, codigo, foto, precio, stock})
        res.send({id: newId, timestamp: fecha, nombre, descripcion, codigo, foto, precio, stock}) 
    }else{
        res.send({ error : -1,
                    descripcion: `ruta /api/productos/ método POST no autorizado`
                 })        
    }        
})

routerProductos.put('/:id', (req, res) => { //Recibe y actualiza un producto según su id
    if(administrador){    
        const iD = productos.find(producto => producto.id === parseInt(req.params.id));
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        let fecha = new Date()

        if(!iD) {
            res.status(400).json({ error : "Producto no encontrado" });
        }else{
            if(!nombre || !descripcion || !codigo || !foto || !precio || !stock){
                res.status(400).json({ "error": "Ingrese todos los datos del producto" });
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
                const index = productos.findIndex(producto => producto.id === parseInt(req.params.id));
                productos[index] = newProducto
                res.send(productos[index])
            }    
        }
    }else{
        res.send({ error : -1,
                    descripcion: `ruta /api/productos/:id método PUT no autorizado`
                 })        
    }
})

routerProductos.delete('/:id', (req, res) => { //Elimina un producto según su id   
    if(administrador){    
        const iD = productos.find(producto => producto.id === parseInt(req.params.id));
        if (!iD) {
            res.status(400).json({ error : "Producto no encontrado" });
        } else {
            const index = productos.findIndex(producto => producto.id === parseInt(req.params.id));
            productos.splice(index, 1);
            res.send(productos)
        } 
    }else{
        res.send({ error : -1,
                    descripcion: `ruta /api/productos/:id método DELETE no autorizado`
                 })        
    }    
})

module.exports = routerProductos