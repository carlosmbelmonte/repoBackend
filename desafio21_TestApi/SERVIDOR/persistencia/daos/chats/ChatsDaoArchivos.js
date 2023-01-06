const { ContenedorArchivo } = require('../../contenedores/ContenedorArchivo')

class ChatsDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('chat.txt')
    }
}

module.exports = { ChatsDaoArchivo }