import { Router } from "express"
import { verifyTokenAdmin, verifyTokenCliente } from "../03_services/middlewares/verifyToken.js"
import { getCartById, postCart, getProductFromCart, deleteCartById, addProductInCart, deleteProductInCart } from "../02_controllers/carts.controllers.js"

const routerCarrito = Router()

routerCarrito.get('/:idCart', getCartById)
routerCarrito.get('/:idCart/productos', getProductFromCart)

routerCarrito.post('/', verifyTokenCliente,postCart)
routerCarrito.delete('/:idCart', verifyTokenCliente,deleteCartById)
routerCarrito.post('/:idCart/productos/:idProd', verifyTokenCliente,addProductInCart)
routerCarrito.delete('/:idCart/productos/:idProd', verifyTokenCliente,deleteProductInCart)

export default routerCarrito