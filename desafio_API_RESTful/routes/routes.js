const { Router } = require('express')
const router = Router()

const productos = []

const getById = (x) =>{
    const idProducto = productos.find(producto => producto.id === x);
    return idProducto    
}

router.get('/', (req, res) => {  // Devuelve todos los productos.
    if(productos.length === 0){
        res.send({ "error" : "No existen productos" })    
    }else{
        res.send(productos)    
    }   
})

router.get('/:id', (req, res) => { //Devuelve un producto según su id
    let iD = getById(parseInt(req.params.id))
    if (iD) {
        res.send(iD)
    } else {
        res.status(400).json({ error : "Producto no encontrado" });
    }   
})

router.post('/', (req, res) => { //Recibe y agrega un producto, y lo devuelve con su id asignado
    const { title, price, thumbnail } = req.body
    let newId

    if(!title || !price || !thumbnail){
        res.status(400).json({ "error": "Ingrese todos los datos del producto" });
    }

    if(productos.length === 0){
        newId=1
    }else{
        newId = productos.length + 1
    }
    productos.push({title, price, thumbnail, id: newId})
    res.send({title, price, thumbnail, id: newId})
})

router.put('/:id', (req, res) => { //Recibe y actualiza un producto según su id
    let iD = getById(parseInt(req.params.id))
    const { title, price, thumbnail } = req.body

    if(!iD) {
        res.status(400).json({ error : "Producto no encontrado" });
    }else{
        if(!title || !price || !thumbnail){
            res.status(400).json({ "error": "Ingrese todos los datos del producto" });
        }else{
            const newProducto = {
                "title": title,
                "price": price,
                "thumbnail": thumbnail,
                "id": parseInt(req.params.id)
            }
            const index = productos.findIndex(producto => producto.id === parseInt(req.params.id));
            productos[index] = newProducto
            res.send(productos[index])
        }    
    } 

        
})
module.exports = router