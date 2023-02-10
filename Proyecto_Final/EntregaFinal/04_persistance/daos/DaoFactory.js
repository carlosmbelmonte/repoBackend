let productosDao
let carritosDao
let usuariosDao
let ordenesDao
let mensajesDao

const varSwitch = process.argv[3] || 'MONGO'

switch (varSwitch) {
    case 'MONGO':
        const { default: ProductosDaoMongo } = await import('./ProductosDaoMongo.js')
        const { default: CarritosDaoMongo } = await import('./CarritosDaoMongo.js')
        const { default: UsuariosDaoMongo } = await import('./UsuariosDaoMongo.js')
        const { default: OrdenesDaoMongo } = await import('./OrdenesDaoMongo.js')
        const { default: MensajesDaoMongo } = await import('./MensajesDaoMongo.js')

        productosDao = new ProductosDaoMongo()
        carritosDao = new CarritosDaoMongo()
        usuariosDao = new UsuariosDaoMongo()
        ordenesDao = new OrdenesDaoMongo()
        mensajesDao = new MensajesDaoMongo()
        break
    default: 
        // do nothing;           
        break
}

class ProductosDaoFactory {
    static getProductoDao() {
        return productosDao
    }
}

class CarritosDaoFactory {
    static getCarritosDao() {
        return carritosDao
    }
}

class UsuariosDaoFactory {
    static getUsuariosDao() {
        return usuariosDao
    }
}

class OrdenesDaoFactory {
    static getOrdenesDao() {
        return ordenesDao
    }
}

class MensajesDaoFactory {
    static getMensajesDao() {
        return mensajesDao
    }
}

export { ProductosDaoFactory, CarritosDaoFactory, UsuariosDaoFactory, OrdenesDaoFactory, MensajesDaoFactory }