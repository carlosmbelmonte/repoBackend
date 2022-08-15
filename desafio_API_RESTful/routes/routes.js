const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {  // GET '/api/productos' -> devuelve todos los productos.
    res.send(`hola mundo desde rutas`)
})

module.exports = router