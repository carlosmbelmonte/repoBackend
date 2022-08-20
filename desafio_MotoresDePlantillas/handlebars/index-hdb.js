const express = require('express')
const { router, productos} = require('./routes/routes')
const { engine } = require('express-handlebars')

const app = express()
const PORT = 8080
const serverPort = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use('/api/productos', router)

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views','./views')

app.get('/', (req, res) => {
    res.render('formulario')
})

app.get('/productos',(req,res) => {
    res.render('tabla',{listExist: productos})
})