const express = require("express")
const { router, productos} = require('./routes/routes')
const { engine } = require('express-handlebars')
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080
const serverPort = httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views','./views')

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use('/api/productos', router)

app.get('/', (req, res) => {
    res.render('formulario')
})

app.get('/productos',(req,res) => {
    res.render('tabla',{listExist: productos})
})


const messages = []

io.on("connection", socket =>{
    console.log("Nuevo cliente conectado")
    socket.emit("new-chat-message", messages)

    //linda chrome
    socket.on("new-message",  message =>{
        console.log(message)
        messages.push(message)
        console.log(messages)
        io.sockets.emit("new-chat-message", messages)
    })
})

