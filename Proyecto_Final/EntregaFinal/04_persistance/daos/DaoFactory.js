let productosDao
let carritosDao
const varSwitch = process.argv[3] || 'MONGO'

switch (varSwitch) {
    case 'MONGO':
        const { default: ProductosDaoMongo } = await import('./ProductosDaoMongo.js')
        const { default: CarritosDaoMongo } = await import('./CarritosDaoMongo.js')

        productosDao = new ProductosDaoMongo()
        carritosDao = new CarritosDaoMongo()
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

export { ProductosDaoFactory, CarritosDaoFactory }