import { get } from "mongoose"
import Carts from "../03_services/carts.services.js"
import Products from "../03_services/products.services.js"

const carritos = new Carts()
const productos = new Products()

const getCartById = async(req, res) => { //Devuelve un carrito según su id
    let getCart = await carritos.getById(parseInt(req.params.idCart))
    if (getCart.length === 0) {
        return res.send({ error : `No existe carrito con ID=${parseInt(req.params.idCart)} `})
    }else{
        return res.send(getCart[0])
    }
}

const getProductFromCart = async(req, res) => { //Devuelve los productos de un carrito segun su id
    let productsFromCart = await carritos.getById(parseInt(req.params.idCart))
    if (productsFromCart.length === 0) {
        return res.send({ error : `No existe carrito con ID=${parseInt(req.params.idCart)} `})
    }else{
        return res.send(productsFromCart[0].productos)
    }
}

const postCart = async(req, res) => { //Recibe y agrega un carrito, y devuelve su id asignado
    //const { email, direccion } = req.user
    const email = req.email
    const direccion = req.direccion
    if(!email || !direccion){
        return res.status(400).json({ error: "Ingrese todos los datos del comprador" });
    }else{
        let idCart = await carritos.save({'timestamp(carrito)': new Date(), productos: [], email, direccion})  
        return res.send(idCart)     
    }  
}

const deleteCartById = async(req, res) => { //Elimina un carrito según su id   
    let getCart = await carritos.getById(parseInt(req.params.idCart))
    let emailToken = req.email

    if (getCart.length === 0) {//Chequeo si existe el carrito
        return res.send({ error : `No existe carrito con ID=${parseInt(req.params.idCart)} `})  
    }

    if(getCart[0].email !== emailToken){//Chequeo si el usuario tiene acceso a ese carrito
        return res.send({ error : `El usuario ${emailToken} no tiene un carrito con ID=${parseInt(req.params.idCart)} `})
    }

    let deleteiDCart = await carritos.deleteById(parseInt(req.params.idCart))   
    return res.send(deleteiDCart)   
}

const addProductInCart = async(req, res) => { //Agrega un producto al carrito por su id de carrito y de producto
    let getCart = await carritos.getById(parseInt(req.params.idCart))
    let productoById = await productos.getById(parseInt(req.params.idProd))
    let emailToken = req.email

    if (getCart.length === 0) {//Chequeo si existe el carrito
        return res.send({ error : `No existe carrito con ID=${parseInt(req.params.idCart)} `})  
    }

    if(getCart[0].email !== emailToken){//Chequeo si el usuario tiene acceso a ese carrito
        return res.send({ error : `El usuario ${emailToken} no tiene un carrito con ID=${parseInt(req.params.idCart)} `})
    }

    if (productoById.length === 0) {//Chequeo si existe el producto
        return res.send({ error : `No existen producto con ID=${parseInt(req.params.idProd)} `})
    }

    let auxArray = getCart[0].productos
    const index = auxArray.findIndex(prod => parseInt(prod.producto.id) === parseInt(req.params.idProd))//Busco si existe el producto en el carrito
    
    if(index === -1){
        getCart[0].productos.push({cantidad: 1, producto: productoById[0] })
        let update = await carritos.putById(parseInt(req.params.idCart), getCart[0])
        if(update.mensaje==="Item Actualizado"){
            return res.send({mensaje: update.mensaje, ProductosEnCarrito: getCart[0].productos})    
        }else{
            return res.send({mensaje: update.mensaje})
        }       
    }else{
        getCart[0].productos[index].cantidad++
        let update = await carritos.putById(parseInt(req.params.idCart), getCart[0])
        if(update.mensaje==="Item Actualizado"){
            return res.send({mensaje: update.mensaje, ProductosEnCarrito: getCart[0].productos})    
        }else{
            return res.send({mensaje: update.mensaje})
        } 
    }
 
}

const deleteProductInCart = async(req,res) => { //Elimina un producto del carrito por su id de carrito y de producto
    let getCart = await carritos.getById(parseInt(req.params.idCart))   
    let emailToken = req.email 

    if (getCart.length === 0) {//Chequeo si existe el carrito
        return res.send({ error : `No existe carrito con ID=${parseInt(req.params.idCart)} `})        
    }
    
    if(getCart[0].email !== emailToken){//Chequeo si el usuario tiene acceso a ese carrito
        return res.send({ error : `El usuario ${emailToken} no tiene un carrito con ID=${parseInt(req.params.idCart)} `})
    }

    const index = getCart[0].productos.findIndex(prod => parseInt(prod.producto.id) === parseInt(req.params.idProd))//Busco si existe el producto en el carrito

    if(index === -1){
        return res.send({ error : `No existe producto con ID=${parseInt(req.params.idProd)} en el carrito con ID=${parseInt(req.params.idCart)}`})
    }else{
        if( parseInt(getCart[0].productos[index].cantidad) > 1){
            getCart[0].productos[index].cantidad--
            let suprimido = await carritos.putById(parseInt(req.params.idCart), getCart[0])
            if(suprimido.mensaje==="Item Actualizado"){
                return res.send({mensaje: "Producto eliminado del carrito"})    
            }else{
                return res.send({error: "No se pudo eliminar el producto del carrito"})
            }    
        }else{
            getCart[0].productos.splice(index,1) 
            let suprimido = await carritos.putById(parseInt(req.params.idCart), getCart[0])
            if(suprimido.mensaje==="Item Actualizado"){
                return res.send({mensaje: "Producto eliminado del carrito"})    
            }else{
                return res.send({error: "No se pudo eliminar el producto del carrito"})
            }             
        }
    }
}

export { getCartById, postCart, getProductFromCart, deleteCartById, addProductInCart, deleteProductInCart }