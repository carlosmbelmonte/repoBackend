import { UsuariosDaoFactory } from '../04_persistance/daos/DaoFactory.js' 

class Users {
    static instance;

    constructor() {
        if (!!Users.instance) {
            return Users.instance;
        }
        Users.instance = this;
    }  
    
    async getAll() {
        try {
            return await UsuariosDaoFactory.getUsuariosDao().getAll()
        } catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            return await UsuariosDaoFactory.getUsuariosDao().getById(id);
        } catch (err) {
            console.log(err);
        }
    }

    async save(objecto) {
        try {
            return await UsuariosDaoFactory.getUsuariosDao().save(objecto);
        } catch (err) {
            console.log(err);
        }
    }
    async getByEmail(email) {
        try {
            return await UsuariosDaoFactory.getUsuariosDao().getByEmail(email);
        } catch (err) {
            console.log(err);
        }
    }    
}

export default Users