import { CarritosDaoFactory } from '../04_persistance/daos/DaoFactory.js' 

class Carts {
    static instance;

    constructor() {
        if (!!Carts.instance) {
            return Carts.instance;
        }
        Carts.instance = this;
    }
    
    async getById(id) {
        try {
            return await CarritosDaoFactory.getCarritosDao().getById(id);
        } catch (err) {
            console.log(err);
        }
    }  
    
    async save(objecto) {
        try {
            return await CarritosDaoFactory.getCarritosDao().save(objecto);
        } catch (err) {
            console.log(err);
        }
    } 

    async deleteById(id) {
        try {
            return await CarritosDaoFactory.getCarritosDao().deleteById(id);
        } catch (err) {
            console.log(err);
        }
    }

    async putById(id, objecto) {
        try {
            return await CarritosDaoFactory.getCarritosDao().putById(id, objecto);
        } catch (err) {
            console.log(err);
        }
    }    
}

export default Carts