import { Router } from "express"
import { getUsuarios , login, signup } from "../02_controllers/users.controllers.js"

const routerUsuarios = Router()

routerUsuarios.post('/login', login)
routerUsuarios.post('/signup', signup)


export default routerUsuarios