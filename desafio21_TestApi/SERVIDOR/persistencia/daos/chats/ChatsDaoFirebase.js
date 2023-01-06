const {ContenedorFirebase} = require('../../contenedores/ContenedorFirebase')

class ChatsDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('chat')
    }
}

module.exports = {ChatsDaoFirebase}