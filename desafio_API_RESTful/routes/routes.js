const { Router } = require('express')
const router = Router()

const productos = [{
    title:"helado",
    price:123,
    thumbnail:"1www",
    id:1
},{
    title:"te",
    price:234,
    thumbnail:"2www",
    id:2
}]

const getById = (x) =>{
    const idProducto = productos.find(producto => producto.id === x);
    return idProducto    
}

router.get('/', (req, res) => {  // Devuelve todos los productos.
    if(productos.length === 0){
        res.send({ "error" : "No existen productos" })    
    }else{
        res.send({ ...productos } )    
    }   
})

router.get('/:id', (req, res) => {
    let iD = getById(parseInt(req.params.id))
    if (iD) {
        res.send(iD)
    } else {
        res.send({ error : "Producto no encontrado" });
    }   
})

module.exports = router