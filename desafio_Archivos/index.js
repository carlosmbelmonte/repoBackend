class Contenedor{
    constructor(fileData){
        this.fileData = fileData;
        this.countId = 0;
    }
    

    //Metodos de la clase
    save = ({title,price,thumbnail}) => {
        let myObj = new Object();
        myObj.title = title;
        myObj.price = price;
        myObj.thumbnail = thumbnail;
        this.countId = this.countId+1;
        myObj.id = this.countId   
        return myObj.id        
    }
}

let productos = new Contenedor('productos.txt');
console.log(productos.save({title: 'Escuadra',price: 123.45,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}))
console.log(productos.save({title: 'Calculadora',price: 234.56,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'}))
console.log(productos.save({title: 'Globo Terráqueo',price: 345.67,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'}))