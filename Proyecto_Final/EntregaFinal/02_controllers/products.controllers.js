import Products from "../03_services/products.services.js"

const productos = new Products()

const getProductos = async(req, res) => {  // Devuelve todos los productos.
    let allProductos = await productos.getAll()
    if(allProductos.length === 0){
        res.send({ error : `No existen productos` })    
    }else{
        res.send(allProductos)    
    }
}

const getProductoById = async(req, res) => { //Devuelve un producto según su id
    let productoById = await productos.getById(parseInt(req.params.id))
    if (productoById.length === 0) {
        res.send({ error : `No existen producto con ID=${parseInt(req.params.id)} `})
    }else{
        res.send(productoById[0])
    }
}

const postProducto = async(req, res) => {  // Devuelve el ID del producto agregado   
    const { nombre, descripcion, categoria, foto, precio, stock } = req.body
    if(!nombre || !descripcion || !categoria || !foto || !precio){
        res.status(400).json({ error: "Ingrese todos los datos del producto" });
    }else{
        let idProducts = await productos.save({'timestamp(producto)': new Date(), nombre, descripcion, categoria, foto, precio, stock})    
        res.send(idProducts)     
    }  
}

const putProductoById = async(req, res) => { //Recibe y actualiza un producto según su id
    const { nombre, descripcion, categoria, foto, precio, stock } = req.body
    if(!nombre || !descripcion || !categoria || !foto || !precio){
        res.status(400).json({ error: "Ingrese todos los datos del producto" });
    }else{
        let putProducto = await productos.putById(parseInt(req.params.id),{"id": parseInt(req.params.id),'timestamp(producto)': new Date(), nombre, descripcion, categoria, foto, precio, stock})
        res.send(putProducto)            
    }
}

const deleteProductoById = async(req, res) => { //Elimina un producto según su id     
    const deleteiDProduct = await productos.deleteById(parseInt(req.params.id))   
    res.send(deleteiDProduct)  
}

const getProductByCategory = async(req, res) => { //Devuelve un producto según su categoria
    let productoByCategory = await productos.getByCategory(req.params.categoria)
    if (productoByCategory.length === 0) {
        res.send({ error : `No existen producto con Categoria=${req.params.categoria} `})
    }else{
        res.send(productoByCategory)
    }
}

export { getProductos , getProductoById, postProducto, putProductoById, deleteProductoById, getProductByCategory }