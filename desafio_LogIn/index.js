const express = require("express")
const { Server: HTTPServer} = require('http')
const { Server: IOServer } = require("socket.io")
const { engine } = require('express-handlebars')
const { routerFaker , productosRandom} = require('./routes/routeFaker')// <-----AGREGADO

const postProducto = require('./public/js/postProducto')
const { normalize, schema } = require("normalizr")//---->Para Normalizr

const { Contenedor } = require('./public/js/contenedor') //---->Para Normalizr
const chats = new Contenedor('./public/chat.txt')//---->Para Normalizr

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'id' }) //---->Para Normalizr
const messageSchema = new schema.Entity('messages', { author: authorSchema }, { idAttribute: '_id' }) //---->Para Normalizr

let productos = productosRandom()
let usuarioPrueba = ''
let varDeslogueo = false

const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views','./views')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.static("public"))

app.use('/api/productos-test', routerFaker)

const PORT = 8080
const serverPort = http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))


app.get('/login', (req, res) => {
    if(usuarioPrueba===''){
        res.render('loginPrevio') 
    }else{
        res.render('formulario',{userSend: usuarioPrueba})    
    }
    console.log("Prueba variable usuario fuera If:", usuarioPrueba)
})

app.post('/login',(req, res) => {
    const { user } = req.body    
    usuarioPrueba = user
    if(user!==''){ 
       res.redirect('/login') 
    }
})

app.get('/logout', (req, res) => {
    if(varDeslogueo){
        res.render('logout',{userSend: usuarioPrueba})
        varDeslogueo = false
        usuarioPrueba=''    
    }else{
        res.status(400).json({ error : "No se puede desloguear, si previamente no se logueo" });
    }   
})

app.post('/logout',(req, res) => {
    const { flag } = req.body    
    varDeslogueo = flag
    if(flag){ 
        res.redirect('/logout') 
    }
})

io.on("connection", async(socket) => {
    console.log("Nuevo cliente conectado")
    socket.emit('allProductos', productos)
    let allChats = await chats.getAll()
    const normalizedMessages = normalize(allChats, [messageSchema])//---->Para Normalizr
    socket.emit('allMensajes', normalizedMessages)

    socket.on('newProducto', async data => {
        await postProducto(data)
        io.sockets.emit('allProductos', productos)
    })

    socket.on('newMensaje', async msg => {
        await chats.saveNormalizr(msg)
        let newAllChats = await chats.getAll()
        const newNormalizedMessages = normalize(newAllChats, [messageSchema])//---->Para Normalizr
        io.sockets.emit('allMensajes', newNormalizedMessages)
    })
})