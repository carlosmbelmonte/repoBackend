import { Router } from "express"
import { getCartById, postCart, getProductFromCart, deleteCartById, addProductInCart, deleteProductInCart } from "../02_controllers/carts.controllers.js"

const routerCarrito = Router()
let administrador = true


routerCarrito.get('/:idCart', getCartById)
routerCarrito.post('/',postCart)
routerCarrito.get('/:idCart/productos', getProductFromCart)
routerCarrito.delete('/:idCart', deleteCartById)
routerCarrito.post('/:idCart/productos/:idProd',addProductInCart)
routerCarrito.delete('/:idCart/productos/:idProd',deleteProductInCart)

export default routerCarrito