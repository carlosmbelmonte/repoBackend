import ContenedorMongo from "../contenedores/ContenedorMongo.js"

class CarritosDaoMongo extends ContenedorMongo {

    constructor() {
        super('carritos', {
            id: {type: Number, require: true, max: 255},
            'timestamp(carrito)': {type: String, require: true, max: 255},
            productos: {type: [], require: true},
            email: {type: String, require: true, max: 255},
            direccion: {type: String, require: true, max: 255}           
        })
    }
}

export default CarritosDaoMongo