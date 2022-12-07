const express = require("express")
const { Server: HTTPServer} = require('http')
const { Server: IOServer } = require("socket.io")
const { engine } = require('express-handlebars')
const { router, productos} = require('./routes/routes')

const postProducto = require('./public/js/postProducto')

const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views','./views')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.static("public"))

app.use('/api/productos', router)

app.get('/', (req, res) => {
    res.render('formulario',{listExist: productos})
})

const PORT = 8080
const serverPort = http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado")
    socket.emit('allProductos', productos)

    socket.on('newProducto', async data => {
        console.log("Nuevo producto agregado: ", data)
        await postProducto(data)
        console.log("Array con todos los productos: ", productos)
        io.sockets.emit('allProductos', productos)
    })
})