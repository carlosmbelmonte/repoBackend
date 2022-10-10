const express = require("express")
const { Server: HTTPServer} = require('http')
const { Server: IOServer } = require("socket.io")
const { engine } = require('express-handlebars')
const { router, tablaProductos } = require('./routes/routes') 
const { routerFaker , productosRandom} = require('./routes/routeFaker')// <-----AGREGADO

const postProducto = require('./public/js/postProducto')

const { Contenedor } = require('./public/js/contenedor') //---->Para Normalizr
const chats = new Contenedor('./public/chatsNormalizr.txt')//---->Para Normalizr

let getProductosDB = []

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
app.use('/api/productos-test', routerFaker)

const PORT = 8080
const serverPort = http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))


app.get('/', (req, res) => {
    sendFuctionProd(() => {
        res.render('formulario',{listExist: getProductosDB})
    })
})

app.get('/faker', (req, res) => {  // <-----AGREGADO
    res.render('tabla',{listFaker: productosRandom()})
})


io.on("connection", async(socket) => {
    console.log("Nuevo cliente conectado")
    socket.emit('allProductos', getProductosDB)// <-----AGREGADO
    let allChats = await chats.getAll()
    socket.emit('allMensajes', allChats)

    socket.on('newProducto', async data => {
        console.log("Nuevo producto agregado: ", data)
        await postProducto(data)       
        sendFuctionProd(() => {
            io.sockets.emit('allProductos', getProductosDB)// <-----AGREGADO
        }) 
    })

    socket.on('newMensaje', async msg => {
        console.log("Nuevo mensaje agregado: ", msg)
        await chats.save(msg)
        let newAllChats = await chats.getAll()
        console.log("Array con todos los chats: ", newAllChats)
        io.sockets.emit('allMensajes', newAllChats)
    })
})

function sendFuctionProd(function_parameter){
    getProductosDB = []
    tablaProductos.getDB().then((rows)=>{
        for(let row of rows){
            getProductosDB.push(
                {
                    id:`${row['ID']}`,
                    title: `${row['Title']}`,
                    price: `${row['Price']}`,
                    thumbnail: `${row['Thumbnail']}`
                }
            )
        }
        function_parameter()
    }).catch(err => console.log(err))    
}