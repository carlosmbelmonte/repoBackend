let productosDao
let carritosDao
let usuariosDao
let ordenesDao

const varSwitch = process.argv[3] || 'MONGO'

switch (varSwitch) {
    case 'MONGO':
        const { default: ProductosDaoMongo } = await import('./ProductosDaoMongo.js')
        const { default: CarritosDaoMongo } = await import('./CarritosDaoMongo.js')
        const { default: UsuariosDaoMongo } = await import('./UsuariosDaoMongo.js')
        const { default: OrdenesDaoMongo } = await import('./OrdenesDaoMongo.js')

        productosDao = new ProductosDaoMongo()
        carritosDao = new CarritosDaoMongo()
        usuariosDao = new UsuariosDaoMongo()
        ordenesDao = new OrdenesDaoMongo()
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

export { ProductosDaoFactory, CarritosDaoFactory, UsuariosDaoFactory, OrdenesDaoFactory }