const { Router } = require('express')
const { fork } = require('child_process')
const path = require('path')
const router = Router()

router.get('/:cant?', (req, res) => {
    const cant = req.query.cant || 10000
    const computo = fork(path.resolve(__dirname, 'computo.js'))
    computo.send(cant)
    computo.on('message', obj => {
        res.send({  
            PuertoEscucha:(process.argv[2]) ,
            ObjetoCalculado: obj,
        })
    })
})

module.exports = {
    router: router
}