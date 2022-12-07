const { Router } = require('express')
//const { faker } = require('@faker-js/faker');
const routerFaker = Router()

const productosRandom = () => {
    /*const data = []

    for (let i=0; i<5 ; i++){
        const producto={
            id:`${i+1}`,
            title: faker.animal.cat(),
            price: faker.commerce.price(100, 1000, 2, 'U$D'),
            thumbnail: faker.image.cats(640, 480, true)
        }

        data.push(producto)
    }*/
    const data = [
        {
            id: 1,
            title: "DDZ1513 Medidor Monofasico",
            price: "250 usd",
            thumbnail: "https://i.postimg.cc/LsfqqLdX/medidor-DDZ1513.png",
        },
        {
            id: 2,
            title: "DTZ1513 Medidor Trifasico",
            price: "550 usd",
            thumbnail: "https://i.postimg.cc/vBs45TMv/medidor-DTZ1513.png",
        },
        {
            id: 3,
            title: "I310 Medidor Trifasico",
            price: "650 usd",
            thumbnail: "https://i.postimg.cc/YqsjbbM0/medidor-I310.png",
        },
        {
            id: 4,
            title: "SL7000 Medidor Trifasico",
            price: "450 usd",
            thumbnail: "https://i.postimg.cc/PfKC8d7m/medidor-SL7000.png",
        },
        {
            id: 5,
            title: "SP2301 Medidor Monofasico",
            price: "200 usd",
            thumbnail: "https://i.postimg.cc/7Y6f3pvj/medidor-SP2301.png",         
        },
        {
            id: 6,
            title: "ZMD405 Medidor Trifasico",
            price: "450 usd",
            thumbnail: "https://i.postimg.cc/qqBgZFNh/medidor-ZMD.png",          
        },
        {
            id: 7,
            title: "ZMG405 Medidor Trifasico",
            price: "300 usd",
            thumbnail: "https://i.postimg.cc/zvd3mkhd/medidor-ZMG.png",     
        },
        {
            id: 8,
            title: "ZMR230 Medidor Trifasico",
            price: "275 usd",
            thumbnail: "https://i.postimg.cc/k4vBsCgP/medidor-ZMR.png",
        }
    ]

    return data
}

routerFaker.get('/', (req, res) => {  // Devuelve todos los productos   
    res.send(productosRandom())     
})

module.exports = {
    routerFaker: routerFaker,
    productosRandom: productosRandom
}