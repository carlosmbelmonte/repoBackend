import { Router } from "express"
import { getUsuarios , login, signup } from "../02_controllers/users.controllers.js"

const routerUsuarios = Router()
let administrador = true

//routerUsuarios.get('/', getUsuarios)
routerUsuarios.get('/', login)
routerUsuarios.post('/', signup)


export default routerUsuarios