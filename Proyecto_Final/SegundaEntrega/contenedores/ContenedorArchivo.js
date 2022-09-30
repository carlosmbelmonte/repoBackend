import fs from 'fs'

class ContenedorArchivo{
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
            const idItems = await this.getAll()            
            const filterId = idItems.filter((item) => item.id !== x)
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
            return []
        } 
    }

    async getById(x){
        try{
            const idItems = await this.getAll()           
            return idItems.find(producto => producto.id == x);            
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
    async saveAll(newArray){
        try{
            await fs.promises.writeFile(this.fileData,JSON.stringify(newArray, null,2))    
        }catch(error){
            throw new Error(`Error al guardar el archivo: ${error}`)
        } 
    }
    
    async putById(x,newObj){
        try{
            const allItems = await this.getAll()             
            const index = allItems.map(item => item.id).indexOf(x)
            allItems[index] = {...newObj, id: x}
            await fs.promises.writeFile(this.fileData,JSON.stringify(allItems, null,2))
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        } 
    }
}

export default ContenedorArchivo