import { OrdenesDaoFactory } from '../04_persistance/daos/DaoFactory.js' 

class Orders {
    static instance;

    constructor() {
        if (!!Orders.instance) {
            return Orders.instance;
        }
        Orders.instance = this;
    }  
    
    async getAll() {
        try {
            return await OrdenesDaoFactory.getOrdenesDao().getAll()
        } catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            return await OrdenesDaoFactory.getOrdenesDao().getById(id);
        } catch (err) {
            console.log(err);
        }
    }

    async save(objecto) {
        try {
            return await OrdenesDaoFactory.getOrdenesDao().save(objecto);
        } catch (err) {
            console.log(err);
        }
    }
    async getByEmail(email) {
        try {
            return await OrdenesDaoFactory.getOrdenesDao().getByEmail(email);
        } catch (err) {
            console.log(err);
        }
    }  
    
    async deleteById(id) {
        try {
            return await OrdenesDaoFactory.getOrdenesDao().deleteById(id);
        } catch (err) {
            console.log(err);
        }
    }
}

export default Orders