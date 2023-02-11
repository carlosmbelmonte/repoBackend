import { Router } from "express"
import { getUsuariosByEmail , login, signup } from "../02_controllers/users.controllers.js"

const routerUsuarios = Router()

routerUsuarios.post('/login', login)
routerUsuarios.post('/signup', signup)
routerUsuarios.get('/:email',getUsuariosByEmail)


export default routerUsuarios