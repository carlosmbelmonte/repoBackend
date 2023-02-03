import mongoose from 'mongoose'
import config from '../config.js'
mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongo {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async getAll(){
        try{
            const respuesta = await this.coleccion.find().sort({id: 1})
            return respuesta
        }catch(err){
            return []     
        }
    }

    async getById(x){
        try{
            const respuesta = await this.coleccion.find({id:{$eq: `${x}`}})
            return respuesta
        }catch(err){
            throw new Error(`Error leer el ID de archivo: ${err}`)
        }
    }

    async getByCategory(x){
        try{
            const respuesta = await this.coleccion.find({categoria:{$eq: `${x}`}})
            return respuesta
        }catch(err){
            throw new Error(`Error leer el ID de archivo: ${err}`)
        }
    }

    async save(newObj){
        let preSave = await this.getAll()
        let newId
        if(preSave.length === 0){
            newId = 1
        }else{
            newId = parseInt(preSave[preSave.length-1].id) + 1
        }
        try{          
            await this.coleccion.insertMany({id:newId, ...newObj})   
            return { id : `${newId}` }
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    } 
    
    async putById(x,newObj){
        try{
            const respuesta = await this.coleccion.find({id:{$eq: `${x}`}})
            if(respuesta.length === 0){
                return { error : `ID= ${x} no fue encontrado`}
            }
            else{
                let retorno = await this.coleccion.replaceOne({id:{$eq: `${x}`}} ,newObj)
                if(retorno.acknowledged === true){
                    return { mensaje: "Item Actualizado",  Item: {id:x,...newObj} }    
                }else{
                    return { mensaje: "No se pudo actualizar el Item"}
                }
                
            }
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        } 
    }

    async deleteById(x){
        try{
            const respuesta = await this.coleccion.find({id:{$eq: `${x}`}})
            if(respuesta.length === 0){
                return { error : `ID= ${x} no fue encontrado`}
            }
            else{
                await this.coleccion.deleteOne({id:{$eq: `${x}`}})

                return { mensaje: "Item Eliminado",  Item: {id:x} }
            }
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        } 
    }
}

export default ContenedorMongo