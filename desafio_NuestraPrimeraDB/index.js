const express = require("express")
const { Server: HTTPServer} = require('http')
const { Server: IOServer } = require("socket.io")
const { engine } = require('express-handlebars')
const { router, tablaProductos } = require('./routes/routes') // <-----AGREGADO

const postProducto = require('./public/js/postProducto')
const { Contenedor } = require('./public/js/contenedor')

const chats = new Contenedor('./public/chats.txt')
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

app.get('/', (req, res) => {  // <-----AGREGADO
    let getAux = []
    tablaProductos.getMariaDB().then((rows)=>{
        for(let row of rows){
            getAux.push(
                {
                    id:`${row['ID']}`,
                    title: `${row['Title']}`,
                    price: `${row['Price']}`,
                    thumbnail: `${row['Thumbnail']}`
                }
            )
        }
        getProductosDB = getAux
        console.log("Productos en tabla: ", getProductosDB)
        res.render('formulario',{listExist: getProductosDB})
    }).catch(err => console.log(err)) 
})

const PORT = 8080
const serverPort = http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))

io.on("connection", async(socket) => {
    console.log("Nuevo cliente conectado")
    socket.emit('allProductos', getProductosDB)// <-----AGREGADO
    let allChats = await chats.getAll()
    socket.emit('allMensajes', allChats)

    socket.on('newProducto', async data => {
        console.log("Nuevo producto agregado: ", data)
        await postProducto(data)      

        let getAux = []
        tablaProductos.getMariaDB().then((rows)=>{
            for(let row of rows){
                getAux.push(
                    {
                        id:`${row['ID']}`,
                        title: `${row['Title']}`,
                        price: `${row['Price']}`,
                        thumbnail: `${row['Thumbnail']}`
                    }
                )
            }
            getProductosDB = getAux
            console.log("Array con todos los productos: ", getProductosDB)
            io.sockets.emit('allProductos', getProductosDB)
        }).catch(err => console.log(err))    
    })

    socket.on('newMensaje', async msg => {
        console.log("Nuevo mensaje agregado: ", msg)
        await chats.save(msg)
        let newAllChats = await chats.getAll()
        console.log("Array con todos los chats: ", newAllChats)
        io.sockets.emit('allMensajes', newAllChats)
    })
})

