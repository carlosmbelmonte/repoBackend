import express from 'express'
//import path from 'path';//---> Solucion encontrada en Google
//import {fileURLToPath} from 'url';//---> Solucion encontrada en Google
import { engine } from 'express-handlebars';

import routerProductos from './01_routes/routeProductos.js'
import routerCarrito from './01_routes/routeCarrito.js'
import routerUsuarios from './01_routes/routeUsuarios.js'
import routerOrdenes from './01_routes/routeOrdenes.js'
import routerMensajes from './01_routes/routeMensajes.js'
import routerViews from './01_routes/routeViews.js'

import * as dotenv from 'dotenv'
dotenv.config()

//const __filename = fileURLToPath(import.meta.url);//---> Solucion encontrada en Google
//const __dirname = path.dirname(__filename);//---> Solucion encontrada en Google

const app = express()
const PORT = process.env.PORT || 8080

const serverPort = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended : true }))
//app.use(express.static(__dirname + '/public'))

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');


app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarrito)
app.use('/api/usuarios', routerUsuarios)
app.use('/api/ordenes', routerOrdenes)
app.use('/api/chat', routerMensajes)
app.use('/',routerViews)

app.use((req, res, next) => {
    res.send({error: -2, descripcion: `ruta no implementada`})
})