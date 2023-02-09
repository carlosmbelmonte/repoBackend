import ContenedorMongo from "../contenedores/ContenedorMongo.js"

class UsuariosDaoMongo extends ContenedorMongo {

    constructor() {
        super('usuarios', {
            id: {type: Number, require: true, max: 255},
            nombrefull: {type: String, require: true},
            password: {type: String, require: true},
            //password2: {type: String, require: true},
            email: {type: String, require: true},
            direccion: {type: String, require: true},
            edad: {type: Number, require: true},
            telefono: {type: Number, require: true},
            avatar: {type: String, require: true},
        })
    }
}

export default UsuariosDaoMongo