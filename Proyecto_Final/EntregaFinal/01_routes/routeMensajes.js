import { Router } from "express"
import { getMensajes, postMensajes, getMensajesByEmail } from "../02_controllers/messages.controllers.js" 

const routerMensajes = Router()

routerMensajes.get('/', getMensajes)
routerMensajes.get('/:email', getMensajesByEmail)
routerMensajes.post('/', postMensajes)


export default routerMensajes