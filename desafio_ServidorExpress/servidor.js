const express = require('express')
const {Contenedor} = require('./contenedor');
const productos = new Contenedor('./productos.txt');

const app = express()

const PORT = process.env.PORT || 8080

const server = app.listen(PORT,() => {
    console.log(`Server Express escuchando en el puerto ${PORT}`)
})

const random = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

app.get('/productos', async (req, res) => { 
    let objProd = await productos.getAll();//Traigo el array de objetos
    let onlyProd = objProd.map(producto => producto.title); //Coloco en el array solo los nombres de los productos
    res.send(onlyProd)
})
app.get('/productoRandom', async (req, res) => { 
    let objProd = await productos.getAll();
    let minimo = Math.min(...objProd.map(x=>parseInt(x.id)));//Busco el minimo ID en el array de objetos
    let maximo = Math.max(...objProd.map(x=>parseInt(x.id)));//Busco el maximo ID en el array de objetos
    let prodRandom = await productos.getById(random(minimo,maximo))//Traigo el producto que coincide con ese ID random
    res.send(prodRandom)
})