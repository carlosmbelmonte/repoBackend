const { varSwitch } = require('../switchDB')
var chatsDao

switch (varSwitch) {
    case 'MEM':
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

module.exports = { 
    chatsDao:chatsDao 
}