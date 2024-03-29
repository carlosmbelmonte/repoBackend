const express = require('express')
const routerProductos = require('./routes/routeProductos')
const routerCarrito = require('./routes/routeCarrito')

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
app.use('/api/carrito', routerCarrito)

app.use((req, res, next) => {
    res.send({error: -2, descripcion: `ruta no implementada`})
})