import { Router } from "express"
import { productosDao as productosApi } from '../daos/index.js'

const routerProductos = Router()
let administrador = true

routerProductos.get('/', async(req, res) => {  // Devuelve todos los productos.
    let allProductos = await productosApi.getAll()
    if(allProductos.length === 0){
        res.send({ "error" : "No existen productos" })    
    }else{
        res.send(allProductos)    
    }   
})

routerProductos.get('/:id', async(req, res) => { //Devuelve un producto según su id
    let allProductos = await productosApi.getAll()
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
        let allProductos = await productosApi.getAll()
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
        allProductos.push({id: newId, 'timestamp(producto)': fecha, nombre, descripcion, codigo, foto, precio, stock})
        await productosApi.saveAll(allProductos)
        res.send({id: newId, 'timestamp(producto)': fecha, nombre, descripcion, codigo, foto, precio, stock}) 
    }else{
        res.send({ error : -1,
                    descripcion: `ruta /api/productos/ método POST no autorizado`
                 })        
    }        
})

routerProductos.put('/:id', async(req, res) => { //Recibe y actualiza un producto según su id
    if(administrador){ 
        let allProductos = await productosApi.getAll()   
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
                    "timestamp(producto)": fecha,
                    "nombre": nombre,
                    "descripcion": descripcion,
                    "codigo": codigo,
                    "foto": foto,
                    "precio": precio,
                    "stock": stock
                }
                await productosApi.putById(parseInt(req.params.id),newProducto)
                allProductos = await productosApi.getAll()
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
        let allProductos = await productosApi.getAll()  
        const iD = allProductos.find(producto => producto.id === parseInt(req.params.id));
        if (!iD) {
            res.status(400).json({ error : "Producto no encontrado" });
        } else {
            await productosApi.deleteById(parseInt(req.params.id))
            allProductos = await productosApi.getAll()
            res.send(allProductos)
        } 
    }else{
        res.send({ error : -1,
                    descripcion: `ruta /api/productos/:id método DELETE no autorizado`
                 })        
    }    
})

export default routerProductos