class Usuario {
    constructor(nombre,apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    //Metodos de la clase
    getFullName = () => {
        return `${this.nombre} ${this.apellido}`
    }
    addMascota = (mascota) => {
        this.mascotas.push(mascota);
    }
    countMascotas = () => {
        return this.mascotas.length
    }
    addBook(nombre, autor){
        this.libros.push(
            {
                nombre: nombre,
                autor: autor
            }
        )
    }
    getBookNames = () => {
        let onlyName = this.libros.map(libro => libro.nombre);
        return onlyName;
    }
}

let usuario1 = new Usuario("Carlos","Belmonte");
let usuario2 = new Usuario("Sandra","Machado");
usuario1.addMascota("Pepita");
usuario1.addMascota("Milenia");
usuario1.addMascota("Pipi");
usuario1.addBook("El señor de los anillos","J. R. R. Tolkien");
usuario1.addBook("Viaje al centro de la Tierra","Julio Verne");

printAll = () => {
    console.log(usuario1.getFullName());
    console.log(usuario1.countMascotas());
    console.log(usuario1.getBookNames());
}

printAll();
