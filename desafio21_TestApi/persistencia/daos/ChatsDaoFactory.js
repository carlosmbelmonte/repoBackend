let chatsDao

const varSwitch = process.argv[6] || 'TXT'

switch (varSwitch) {
    case 'TXT':
        const { ChatsDaoArchivo } = require('./chats/ChatsDaoArchivos')
        chatsDao = new ChatsDaoArchivo()
        break
    case 'FIRE':
        const { ChatsDaoFirebase } = require('./chats/ChatsDaoFirebase')
        chatsDao = new ChatsDaoFirebase()
        break
    default: 
        // do nothing;           
        break
}

class ChatsDaoFactory {
    static getDao() {
        return chatsDao
    }
}

module.exports = { ChatsDaoFactory };