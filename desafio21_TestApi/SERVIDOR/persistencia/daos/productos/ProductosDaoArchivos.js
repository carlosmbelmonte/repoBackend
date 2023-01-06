const { ContenedorArchivo } = require('../../contenedores/ContenedorArchivo')

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('productos.txt')
    }
}

module.exports = { ProductosDaoArchivo }