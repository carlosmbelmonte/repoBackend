const express = require('express')
const {Contenedor} = require('./contenedor');
const productos = new Contenedor('./productos.txt');

const app = express()

const PORT = process.env.PORT || 8080

const server = app.listen(PORT,() => {
    console.log(`Server Express escuchando en el puerto ${PORT}`)
})

const main = async() => {
    let objProd = await productos.getAll();
    let onlyProd = objProd.map(producto => producto.title);

    app.get('/productos', (req, res) => { 
        res.send(onlyProd)
    })
}

main()


