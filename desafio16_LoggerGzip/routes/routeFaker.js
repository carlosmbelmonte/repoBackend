const { Router } = require('express')
const { faker } = require('@faker-js/faker');
const routerFaker = Router()

const productosRandom = () => {
    const data = []

    for (let i=0; i<5 ; i++){
        const producto={
            id:`${i+1}`,
            title: faker.animal.cat(),
            price: faker.commerce.price(100, 1000, 2, 'U$D'),
            thumbnail: faker.image.cats(640, 480, true)
        }

        data.push(producto)
    }
    return data
}

routerFaker.get('/', (req, res) => {  // Devuelve todos los productos   
    res.send(productosRandom())     
})

module.exports = {
    routerFaker: routerFaker,
    productosRandom: productosRandom
}