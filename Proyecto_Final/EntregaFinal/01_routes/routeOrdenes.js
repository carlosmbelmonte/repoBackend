import { Router } from "express"
import { getOrders, getOrderById, postOrder, deleteOrderById } from "../02_controllers/orders.controllers.js"

const routerOrdenes = Router()

routerOrdenes.get('/', getOrders)
routerOrdenes.get('/:id', getOrderById)
routerOrdenes.post('/:idCart',postOrder)
routerOrdenes.delete('/:id', deleteOrderById)

export default routerOrdenes