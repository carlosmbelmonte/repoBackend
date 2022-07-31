const fs = require('fs');

class Contenedor{
    constructor(fileData){
        this.fileData = fileData;
        this.countId = 0;
    }
    
    //Metodos de la clase
    deleteAll = async () => {
        try{
            await fs.promises.writeFile('./productos.txt','[]')    
        }catch(err){
            console.log('NO SE PUEDE LEER EL ARCHIVO',err)
        }            
    }
    getAll = async () => {
        try{
            const todos = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8'))
            console.log(todos)
        }catch(err){
            console.log('NO SE PUEDE LEER EL ARCHIVO',err)
        } 
    }
    save = async ({title,price,thumbnail}) => {         
        try{
            const informacion = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8')) 
            if(informacion.length == 0 || informacion.length > 0){
                informacion.push(
                    {
                        title: title,
                        price: price,
                        thumbnail: thumbnail,
                        id: informacion.length + 1
                    }
                )
                await fs.promises.writeFile('./productos.txt',JSON.stringify(informacion, null,2))              
            }


           //console.log(longitud)
           //const identificador = informacion[0].id
           //console.log(identificador)
           
        }catch(err){
            console.log('NO SE PUEDE LEER EL ARCHIVO',err)
        }
        /*
        let myObj = new Object();
        myObj.title = title;
        myObj.price = price;
        myObj.thumbnail = thumbnail;
        this.countId = this.countId+1;
        myObj.id = this.countId   
        return `${myObj.id} ${this.fileData}` 
        */      
    }
}

let productos = new Contenedor('./productos.txt');
//productos.getAll()
//productos.save({title: 'Escuadra',price: 123.45,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'})
//productos.save({title: 'Calculadora',price: 234.56,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'})
//productos.save({title: 'Globo Terráqueo',price: 345.67,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'})
//productos.deleteAll()