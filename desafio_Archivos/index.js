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

    deleteById = async (x) => {
        try{
            const idProductos = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8'))           
            const filterId = idProductos.filter((item) => item.id !== x)
            await fs.promises.writeFile('./productos.txt',JSON.stringify(filterId, null,2)) 
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

    getById = async (x) => {
        try{
            const idProductos = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8'))           
            for(let i=0;i<idProductos.length;i++){
                if(idProductos[i].id === x){
                    console.log(idProductos[i])
                }else{
                    console.log("EL PRODUCTO NO EXISTE")
                    return 0
                }
            }
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
        }catch(err){
            console.log('NO SE PUEDE LEER EL ARCHIVO',err)
        }     
    }
}

let productos = new Contenedor('./productos.txt');
//productos.getAll()
//productos.getById(7)
//productos.deleteById(2)
//productos.save({title: 'Escuadra',price: 123.45,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'})
//productos.save({title: 'Calculadora',price: 234.56,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'})
//productos.save({title: 'Globo Terráqueo',price: 345.67,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'})
productos.deleteAll()