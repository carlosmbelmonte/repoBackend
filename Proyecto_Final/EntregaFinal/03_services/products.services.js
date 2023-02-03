import { ProductosDaoFactory } from '../04_persistance/daos/DaoFactory.js' 

class Products {
    static instance;

    constructor() {
        if (!!Products.instance) {
            return Products.instance;
        }
        Products.instance = this;
    }  
    
    async getAll() {
        try {
            return await ProductosDaoFactory.getProductoDao().getAll()
        } catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            return await ProductosDaoFactory.getProductoDao().getById(id);
        } catch (err) {
            console.log(err);
        }
    }

    async save(objecto) {
        try {
            return await ProductosDaoFactory.getProductoDao().save(objecto);
        } catch (err) {
            console.log(err);
        }
    }

    async putById(id, objecto) {
        try {
            return await ProductosDaoFactory.getProductoDao().putById(id, objecto);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteById(id) {
        try {
            return await ProductosDaoFactory.getProductoDao().deleteById(id);
        } catch (err) {
            console.log(err);
        }
    }

    async getByCategory(category) {
        try {
            return await ProductosDaoFactory.getProductoDao().getByCategory(category);
        } catch (err) {
            console.log(err);
        }
    }
    
}

export default Products