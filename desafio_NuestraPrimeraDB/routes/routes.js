const { Router } = require('express')
const router = Router()

const { ClienteMariaDB } = require('../public/js/clienteMariaDB')
const tablaProductos = new ClienteMariaDB("articulos")

tablaProductos.crearTablaMariaDB().then(()=>{
    console.log("Tabla creada")
}).catch(err => console.log(err))

const productos = []

const getById = (x) =>{
    const idProducto = productos.find(producto => producto.id === x);
    return idProducto    
}

router.get('/', (req, res) => {  // Devuelve todos los productos
    let x_productos = []

    tablaProductos.getMariaDB().then((rows)=>{
        for(let row of rows){
            x_productos.push(
                {
                    id:`${row['ID']}`,
                    title: `${row['Title']}`,
                    thumbnail: `${row['Thumbnail']}`,
                    price: `${row['Price']}`
                }
            )
        }
        console.log(x_productos)

        if(x_productos.length === 0){
            res.send({ "error" : "No existen productos" })    
        }else{
            res.send(x_productos)    
        }

    }).catch(err => console.log(err))       
})

router.get('/:id', (req, res) => { //Devuelve un producto según su id
    let iD = getById(parseInt(req.params.id))
    if (iD) {
        res.send(iD)
    } else {
        res.status(400).json({ error : "Producto no encontrado" });
    }   
})

router.post('/', (req, res) => { //Recibe y agrega un producto, y lo devuelve con su id asignado
    const { title, price, thumbnail } = req.body
    let newId = []

    if(!title || !price || !thumbnail){
        res.status(400).json({ "error": "Ingrese todos los datos del producto" })
        return 0
    }

    tablaProductos.postMariaDB(
        {
            Title: title, 
            Price: price, 
            Thumbnail: thumbnail
        }
    ).then(() => {
        console.log("Data insertada")
        tablaProductos.getMariaDB().then((rows)=>{
            for(let row of rows){
                newId.push(`${row['ID']}`)
            }
            res.send({title, price, thumbnail, id: newId[newId.length -1]})
        }).catch(err => console.log(err))   
    }).catch(err => console.log(err))    
})

router.put('/:id', (req, res) => { //Recibe y actualiza un producto según su id
    let iD = getById(parseInt(req.params.id))
    const { title, price, thumbnail } = req.body

    if(!iD) {
        res.status(400).json({ error : "Producto no encontrado" });
    }else{
        if(!title || !price || !thumbnail){
            res.status(400).json({ "error": "Ingrese todos los datos del producto" });
        }else{
            const newProducto = {
                "title": title,
                "price": price,
                "thumbnail": thumbnail,
                "id": parseInt(req.params.id)
            }
            const index = productos.findIndex(producto => producto.id === parseInt(req.params.id));
            productos[index] = newProducto
            res.send(productos[index])
        }    
    }       
})

router.delete('/:id', (req, res) => { //Elimina un producto según su id
    let iD = getById(parseInt(req.params.id))
    if (!iD) {
        res.status(400).json({ error : "Producto no encontrado" });
    } else {
        const index = productos.findIndex(producto => producto.id === parseInt(req.params.id));
        productos.splice(index, 1);
        res.send(productos)
    }   
})

module.exports = {
    router: router,
    productos: productos,
}