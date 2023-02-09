import ContenedorMongo from "../contenedores/ContenedorMongo.js"

class CarritosDaoMongo extends ContenedorMongo {

    constructor() {
        super('ordenes', {
            id: {type: Number, require: true, max: 255},
            item: {type: [], require: true},
            preciototal:{type: Number, require: true},
            'timestamp(ordenes)': {type: String, require: true, max: 255},
            estado: {type: String, require: true, max: 255},
            email: {type: String, require: true, max: 255},
            direccion: {type: String, require: true, max: 255}             
        })
    }
}

export default CarritosDaoMongo