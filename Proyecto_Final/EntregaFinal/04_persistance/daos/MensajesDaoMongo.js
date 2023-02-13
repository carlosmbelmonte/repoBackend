import ContenedorMongo from "../contenedores/ContenedorMongo.js"

class MensajesDaoMongo extends ContenedorMongo {

    constructor() {
        super('mensajes', {
            id: {type: Number, require: true, max: 255},
            email: {type: String, require: true},
            tipo: {type: String, require: true},
            fecha: {type: String, require: true, max: 100},
            mensaje: {type: String, require: true},
        })
    }
}

export default MensajesDaoMongo