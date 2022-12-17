const {ContenedorFirebase} = require('../../contenedores/ContenedorFirebase')

class ChatsDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('chats')
    }
}

module.exports = {ChatsDaoFirebase}