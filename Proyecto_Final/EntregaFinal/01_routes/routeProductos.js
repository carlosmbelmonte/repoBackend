import { Router } from "express"
import { getProductos, getProductoById, postProducto, putProductoById, deleteProductoById, getProductByCategory } from "../02_controllers/products.controllers.js"

const routerProductos = Router()
let administrador = true

routerProductos.get('/', getProductos)
routerProductos.get('/:id', getProductoById)
routerProductos.post('/', postProducto)
routerProductos.put('/:id',putProductoById)
routerProductos.delete('/:id', deleteProductoById)
routerProductos.get('/categoria/:categoria', getProductByCategory)

export default routerProductos