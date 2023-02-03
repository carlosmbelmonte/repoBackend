import ContenedorMongo from "../contenedores/ContenedorMongo.js"

class ProductosDaoMongo extends ContenedorMongo {

    constructor() {
        super('productos', {
            id: {type: Number, require: true, max: 255},
            'timestamp(producto)': {type: String, require: true, max: 100},
            nombre: {type: String, require: true, max: 100},
            descripcion: {type: String, require: true},
            categoria: {type: String, require: true},
            foto: {type: String, require: true},
            precio: {type: Number, require: true},
            stock: {type: Number, require: false},          
        })
    }
}

export default ProductosDaoMongo