import { MensajesDaoFactory } from '../04_persistance/daos/DaoFactory.js' 

class Messages {
    static instance;

    constructor() {
        if (!!Messages.instance) {
            return Messages.instance;
        }
        Messages.instance = this;
    }  
    
    async getAll() {
        try {
            return await MensajesDaoFactory.getMensajesDao().getAll()
        } catch (err) {
            console.log(err);
        }
    }

    async getByEmail(email) {
        try {
            return await MensajesDaoFactory.getMensajesDao().getByEmail(email);
        } catch (err) {
            console.log(err);
        }
    }

    async save(objecto) {
        try {
            return await MensajesDaoFactory.getMensajesDao().save(objecto);
        } catch (err) {
            console.log(err);
        }
    }  
}

export default Messages