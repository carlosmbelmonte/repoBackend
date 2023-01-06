let chatsDao
let productosDao

const varSwitch = process.argv[6] || 'TXT'

switch (varSwitch) {
    case 'TXT':
        const { ChatsDaoArchivo } = require('./chats/ChatsDaoArchivos')
        const { ProductosDaoArchivo } = require('./productos/ProductosDaoArchivos')
        chatsDao = new ChatsDaoArchivo()
        productosDao = new ProductosDaoArchivo()
        break
    case 'FIRE':
        const { ChatsDaoFirebase } = require('./chats/ChatsDaoFirebase')
        const { ProductosDaoFirebase } = require('./productos/ProductosDaoFirebase')
        chatsDao = new ChatsDaoFirebase()
        productosDao = new ProductosDaoFirebase()
        break
    default: 
        // do nothing;           
        break
}

class ChatsDaoFactory {
    static getChatDao() {
        return chatsDao
    }
}

class ProductosDaoFactory {
    static getProductoDao() {
        return productosDao
    }
}

module.exports = { ChatsDaoFactory , ProductosDaoFactory};