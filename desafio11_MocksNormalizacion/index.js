const express = require("express")
const { Server: HTTPServer} = require('http')
const { Server: IOServer } = require("socket.io")
const { engine } = require('express-handlebars')
//const { router } = require('./routes/routes') 
const { routerFaker , productosRandom} = require('./routes/routeFaker')// <-----AGREGADO

const postProducto = require('./public/js/postProducto')
const { normalize, schema } = require("normalizr")//---->Para Normalizr

const { Contenedor } = require('./public/js/contenedor') //---->Para Normalizr
const chats = new Contenedor('./public/chat.txt')//---->Para Normalizr

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'id' }) //---->Para Normalizr
const messageSchema = new schema.Entity('messages', { author: authorSchema }, { idAttribute: '_id' }) //---->Para Normalizr

let productos = productosRandom()

const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views','./views')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.static("public"))

//app.use('/api/productos', router)
app.use('/api/productos-test', routerFaker)

const PORT = 8080
const serverPort = http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))


app.get('/', (req, res) => {
    res.render('formulario',{listExist: productos})
})

io.on("connection", async(socket) => {
    console.log("Nuevo cliente conectado")
    socket.emit('allProductos', productos)
    let allChats = await chats.getAll()
    const normalizedMessages = normalize(allChats, [messageSchema])//---->Para Normalizr
    console.log("Array con todos los chats: ", normalizedMessages)
    socket.emit('allMensajes', normalizedMessages)

    socket.on('newProducto', async data => {
        console.log("Nuevo producto agregado: ", data)
        await postProducto(data)
        console.log("Array con todos los productos: ", productos)
        io.sockets.emit('allProductos', productos)
    })

    socket.on('newMensaje', async msg => {
        console.log("Nuevo mensaje agregado: ", msg)
        await chats.saveNormalizr(msg)
        let newAllChats = await chats.getAll()
        const newNormalizedMessages = normalize(newAllChats, [messageSchema])//---->Para Normalizr
        console.log("Array con todos los chats: ", newNormalizedMessages)
        io.sockets.emit('allMensajes', newNormalizedMessages)
    })
})