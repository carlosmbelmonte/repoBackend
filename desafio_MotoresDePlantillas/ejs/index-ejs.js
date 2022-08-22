const express = require('express')
const { router, productos} = require('./routes/routes')

const app = express()
const PORT = 8080
const serverPort = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
serverPort.on('error', error => console.log(`Error en el puerto del servidor: ${error}`))

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use('/api/productos', router)

app.set('views','./views')
app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.render('formulario',{
        titleTag: 'Ingrese producto (usando ejs)',
        btnPath:'../productos',
        btnFrase:'Lista de Productos'
    })
})

app.get('/productos',(req,res) => {
    res.render('tabla',{
        listExist: productos,
        titleTag: 'Vista de productos (usando ejs)',
        btnPath:'../',
        btnFrase:'Ir al formulario de carga'
    })
})