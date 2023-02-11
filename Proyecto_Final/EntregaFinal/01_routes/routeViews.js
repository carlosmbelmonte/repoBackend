import { Router } from "express"

const routerViews = Router()

routerViews.get('/', async(req, res) => { res.render('login') })
//routerViews.get('/loginerror/:error', async(req, res) => { res.render('login-error',{ error: req.params.error }) })

export default routerViews