import { Router } from "express"
import { verifyTokenAdmin, verifyTokenCliente } from "../03_services/middlewares/verifyToken.js"
import { getOrders, getOrderById, postOrder, deleteOrderById, getOrderByEmail } from "../02_controllers/orders.controllers.js"

const routerOrdenes = Router()

routerOrdenes.get('/', getOrders)
routerOrdenes.get('/:id', getOrderById)
routerOrdenes.get('/email/:email', getOrderByEmail)
routerOrdenes.post('/:idCart', verifyTokenCliente,postOrder)
routerOrdenes.delete('/:id', verifyTokenCliente,deleteOrderById)

export default routerOrdenes