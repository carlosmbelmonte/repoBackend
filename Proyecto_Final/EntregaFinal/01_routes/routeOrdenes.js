import { Router } from "express"
import { verifyTokenAdmin, verifyTokenCliente } from "../03_services/middlewares/verifyToken.js"
import { getOrders, getOrderById, postOrder, deleteOrderById } from "../02_controllers/orders.controllers.js"

const routerOrdenes = Router()

routerOrdenes.get('/', getOrders)
routerOrdenes.get('/:id', getOrderById)
routerOrdenes.post('/:idCart', verifyTokenCliente,postOrder)
routerOrdenes.delete('/:id', verifyTokenCliente,deleteOrderById)

export default routerOrdenes