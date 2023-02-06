import express from 'express'
import path from 'path';//---> Solucion encontrada en Google
import {fileURLToPath} from 'url';//---> Solucion encontrada en Google
import routerProductos from './01_routes/routeProductos.js'
import routerCarrito from './01_routes/routeCarrito.js'
import routerUsuarios from './01_routes/routeUsuarios.js'
import * as dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);//---> Solucion encontrada en Google
const __dirname = path.dirname(__filename);//---> Solucion encontrada en Google

const app = express()
const PORT = process.env.PORT || 8080

const serverPort = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.static(__dirname + '/public'));

app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarrito)
app.use('/api/usuarios', routerUsuarios)

app.use((req, res, next) => {
    res.send({error: -2, descripcion: `ruta no implementada`})
})