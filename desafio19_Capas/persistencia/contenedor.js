const fs = require('fs');
const log4js = require('log4js')
const logger = require('../controlador/logger');

class Contenedor{
    constructor(fileData){
        this.fileData = fileData;
    }
    
    //Metodos de la clase
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.fileData,'[]')    
        }catch(error){
            throw new Error(`Error al eliminar el archivo: ${error}`)
        }            
    }

    async deleteById(x){
        try{
            const idProductos = await this.getAll()            
            const filterId = idProductos.filter((item) => item.id !== x)
            await fs.promises.writeFile(this.fileData,JSON.stringify(filterId, null,2)) 
        }catch(error){
            throw new Error(`Error al eliminar el objeto del archivo: ${error}`)
        }
    }

    async getAll(){
        try{
            const todos = await fs.promises.readFile(this.fileData,'utf-8')
            return JSON.parse(todos)
        }catch(err){
            logger.error(`Archivo Vacio o Inexistente`)
            return []
        } 
    }

    async getById(x){
        try{
            const idProductos = await this.getAll()           
            return idProductos.find(producto => producto.id == x);            
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        } 
    }

    async save(newObj){
        const informacion = await this.getAll()
        let newId
        if(informacion.length == 0){
            newId = 1
        }else{
            newId = parseInt(informacion[informacion.length-1].id) + 1
        }
        informacion.push({...newObj, id: newId})
        try{
            await fs.promises.writeFile(this.fileData,JSON.stringify(informacion, null,2))
            return newId    
        }catch(error){
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async saveNormalizr(newObj){
        const informacion = await this.getAll()
        let newId
        if(informacion.length == 0){
            newId = 1
        }else{
            newId = parseInt(informacion[informacion.length-1]._id) + 1
        }
        informacion.push({...newObj, _id: newId})
        try{
            await fs.promises.writeFile(this.fileData,JSON.stringify(informacion, null,2))
            return newId    
        }catch(error){
            throw new Error(`Error al guardar: ${error}`)
        }
    }  
    
    async normalizadoGuardado(msjNormalizado){
        try{
            await fs.promises.writeFile(this.fileData,JSON.stringify(msjNormalizado, null,2))   
        }catch(error){
            throw new Error(`Error al guardar: ${error}`)
        }   
    }
}

module.exports = { Contenedor };