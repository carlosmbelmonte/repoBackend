import { Router } from "express"
import { getMensajes, postMensajes } from "../02_controllers/messages.controllers.js" 

const routerMensajes = Router()

routerMensajes.get('/', getMensajes)
routerMensajes.post('/', postMensajes)

export default routerMensajes