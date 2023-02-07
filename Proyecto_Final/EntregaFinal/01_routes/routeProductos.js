import { Router } from "express"
import { verifyTokenAdmin, verifyTokenCliente } from "../03_services/middlewares/verifyToken.js"
import { getProductos, getProductoById, postProducto, putProductoById, deleteProductoById, getProductByCategory } from "../02_controllers/products.controllers.js"

const routerProductos = Router()

routerProductos.get('/', getProductos)
routerProductos.get('/:id', getProductoById)
routerProductos.get('/categoria/:categoria', getProductByCategory)

/*SOLO ADMIN PUEDE MODIFICAR/BORRAR PRODUCTO*/
routerProductos.post('/', verifyTokenAdmin,postProducto)
routerProductos.put('/:id', verifyTokenAdmin,putProductoById)
routerProductos.delete('/:id', verifyTokenAdmin,deleteProductoById)

export default routerProductos