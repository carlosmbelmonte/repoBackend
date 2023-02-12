import { Router } from "express"
import { renderLogin, renderProductos, renderLogout } from "../02_controllers/views.controller.js"

const routerViews = Router()

routerViews.get('/', renderLogin)
routerViews.get('/productos', renderProductos)
routerViews.get('/logout', renderLogout)


export default routerViews