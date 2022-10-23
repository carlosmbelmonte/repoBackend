const express = require("express")
const { Server: HTTPServer} = require('http')
const { Server: IOServer } = require("socket.io")
const { engine } = require('express-handlebars')
const { routerFaker , productosRandom} = require('./routes/routeFaker')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')// <-----AGREGADO
const { Users } = require('./public/js/esquemaMongo')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt')

const postProducto = require('./public/js/postProducto')
const { normalize, schema } = require("normalizr")//---->Para Normalizr

const { Contenedor } = require('./public/js/contenedor') //---->Para Normalizr
const chats = new Contenedor('./public/chat.txt')//---->Para Normalizr

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'id' }) //---->Para Normalizr
const messageSchema = new schema.Entity('messages', { author: authorSchema }, { idAttribute: '_id' }) //---->Para Normalizr

let productos = productosRandom()
let varDeslogueo = false
let flagRegister = true

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


/* --------------------------------------------------------------------------*/
/*              Persistencia por MongoDB - Conexion con mongoose             */
/* --------------------------------------------------------------------------*/
const clientP = mongoose.connect(
    'mongodb+srv://carlosmbelmonte:Carlos123@cluster0.zxvolg7.mongodb.net/sesionPrueba?retryWrites=true&w=majority',
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
    ).then(m => m.connection.getClient())

app.use(session({
    store: MongoStore.create({
        client: clientP
    }),
    /* ----------------------------------------------------- */

    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

function autentificador(req, res, next) {
    const nombre = req.session?.usuario
    if (nombre) {
        next()
    } else {
        res.redirect('/login')
    }
}

app.get('/', (req, res) => {
    res.redirect('/login')  
})
//---------------------------------------------//
app.get('/register', (req, res) => {
    if(flagRegister){
        res.render('register')
    }else{
        res.redirect('/failregister')    
    }   
})
app.get('/login2', (req, res) => {
    res.render('login2') 
})
app.get('/failregister', (req, res) => {
    res.render('failregister')         
})
app.get('/faillogin', (req, res) => {
    res.render('faillogin') 
})

app.post('/register', async(req, res) => {
    const userEmail = req.body.userEmail;
    const userAlias = req.body.userAlias;
    const userPass = req.body.userPass;

    try {
        const respuesta=await Users.find({ email: `${userEmail}`})

        if(respuesta.length === 0){
            await Users.create({
                alias: userAlias,
                email: userEmail,
                password: userPass,
            }) 
            flagRegister = true               
        }else{
            console.log(respuesta[0].email)
            flagRegister = false
            return res.render('failregister')  
        }
    } catch (err) {
        res.status(500).send({ error: true, message: err.message });
    }
})

//---------------------------------------------//
app.get('/login', (req, res) => {
    const nombre = req.session?.usuario
    if(nombre){
        res.redirect('/home')  
    }
    else{ 
        res.render('loginPrevio')
    }
})

app.get('/home', autentificador,(req, res) => {
    res.render('formulario',{userSend: req.session.usuario})
    varDeslogueo = true        
})

app.post('/login',(req, res) => {
    const { user } = req.body  
    req.session.usuario = user 
    if(user){ res.redirect('/') }
})

app.get('/logout', (req, res) => {
    if(varDeslogueo){
        const aux = req.session?.usuario
   
        if(aux){
            varDeslogueo = false 
            req.session.destroy(err => {
                if (!err) res.render('logout',{userSend: aux})
                else res.send({ status: 'Logout ERROR', body: err })
            })            
        }
    }
    else{ res.redirect('/') } 
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