const fs = require('fs');

class Contenedor{
    constructor(fileData){
        this.fileData = fileData;
        this.countId=0
    }
    
    //Metodos de la clase
    deleteAll = async () => {
        try{
            await fs.promises.writeFile('./productos.txt','[]')    
        }catch(err){
            console.log('NO SE PUEDE LEER EL ARCHIVO',err)
        }  
        this.countId = 0          
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
            console.log("Se imprime todos los productos: \n",todos)
        }catch(err){
            console.log('NO SE PUEDE LEER EL ARCHIVO',err)
        } 
    }

    getById = async (x) => {
        try{
            const idProductos = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8'))           
            let indice = idProductos.findIndex(producto => producto.id == x);
            if(indice == -1){
                console.log("No se encuentra el producto")
            }else{
                console.log(`Se muestra el producto correspondiente al id = ${x} : \n`,idProductos[indice])    
            }
            
        }catch(err){
            console.log('NO SE PUEDE LEER EL ARCHIVO',err)
        } 
    }

    save = async ({title,price,thumbnail}) => {         
        try{
            const informacion = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8')) 
            if(informacion.length == 0 || informacion.length > 0){
                if(informacion.length == 0){
                    this.countId = 1
                }else{
                    this.countId = (informacion[informacion.length-1].id) + 1
                }
                informacion.push(
                    {
                        title: title,
                        price: price,
                        thumbnail: thumbnail,
                        id: this.countId
                    }
                )
                console.log("El Id del producto guardado es: ", this.countId)
                await fs.promises.writeFile('./productos.txt',JSON.stringify(informacion, null,2))              
            }          
        }catch(err){
            console.log('NO SE PUEDE LEER EL ARCHIVO',err)
        }     
    }
}

let productos = new Contenedor('./productos.txt');
//productos.save({title: 'Escuadra',price: 123.45,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'})
//productos.save({title: 'Calculadora',price: 234.56,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'})
//productos.save({title: 'Globo Terráqueo',price: 345.67,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'})
productos.getAll()
//productos.getById(2)
//productos.deleteById(2)
//productos.deleteAll()






