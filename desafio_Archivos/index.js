const fs = require('fs');

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
}

const productos = new Contenedor('./productos.txt');

const main = async () => {
    let idReferencia = 2

    //Guardar productos
    await productos.save({title: 'Escuadra',price: 123.45,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'})
    await productos.save({title: 'Calculadora',price: 234.56,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'})
    await productos.save({title: 'Globo Terráqueo',price: 345.67,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'})

    //Mostramos todos los productos
    let allProducts = await productos.getAll();
    console.log('Mostramos todos los productos guardados: \n',allProducts);

    //Mostramos un producto por id
    const product = await productos.getById(idReferencia);  
    if (product === undefined) {
        console.log('No se encuentra producto con dicho ID');    
    }else{
        console.log(`Producto con ID: ${idReferencia} \n`, product);    
    }

    //Eliminamos un producto por ID
    await productos.deleteById(idReferencia);
    delProducts = await productos.getAll();
    console.log(`Archivo sin el Producto con ID: ${idReferencia} \n`, delProducts);

    await productos.deleteAll()
    AlldeleteProducts = await productos.getAll();
    console.log('Archivo sin productos: \n', AlldeleteProducts);
}

main();






