const express = require('express')
const router = require('./routes/routes')

const app = express()
const PORT = 8080

const serverPort = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.static(__dirname + '/public'));

app.use('/api/productos', router)