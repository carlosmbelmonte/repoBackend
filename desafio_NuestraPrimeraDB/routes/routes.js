const { Router } = require('express')
const router = Router()

const { ClienteMariaDB } = require('../public/js/clienteMariaDB')
const tablaProductos = new ClienteMariaDB("articulos")

tablaProductos.crearTablaMariaDB().then(()=>{
    console.log("Tabla creada")
}).catch(err => console.log(err))

const productos = []

router.get('/', (req, res) => {  // Devuelve todos los productos
    let x_productos = []

    tablaProductos.getMariaDB().then((rows)=>{
        for(let row of rows){
            x_productos.push(
                {
                    id:`${row['ID']}`,
                    title: `${row['Title']}`,
                    price: `${row['Price']}`,
                    thumbnail: `${row['Thumbnail']}`
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
    let iD = parseInt(req.params.id)
    let objNew = {}

    tablaProductos.getMariaDbById(iD).then((rows)=>{
        for(let row of rows){
            objNew = {
                id: `${row['ID']}`,
                title: `${row['Title']}`, 
                price: `${row['Price']}`, 
                thumbnail: `${row['Thumbnail']}`                
            }
        }

        if(Object.keys(objNew).length === 0){
            res.status(400).json({ error : "Producto no encontrado" });    
        }else{
            res.send(objNew)    
        }
    }).catch(err => console.log(err))   
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
            res.send({id: newId[newId.length -1], title, price, thumbnail})
        }).catch(err => console.log(err))   
    }).catch(err => console.log(err))    
})

router.put('/:id', (req, res) => { //Recibe y actualiza un producto según su id   
    let iD = parseInt(req.params.id)
    const { title, price, thumbnail } = req.body
    let objNew = {}

    if(!title || !price || !thumbnail){
        res.status(400).json({ "error": "Ingrese todos los datos del producto" })
        return 0
    }else{
        tablaProductos.getMariaDbById(iD).then((rows)=>{
            for(let row of rows){
                objNew = {
                    id: `${row['ID']}`,
                    title: `${row['Title']}`, 
                    price: `${row['Price']}`, 
                    thumbnail: `${row['Thumbnail']}`                
                }
            }

            if(Object.keys(objNew).length === 0){
                res.status(400).json({ error : "Producto no encontrado" });    
            }else{
                tablaProductos.putMariaDbById(iD, { ID: objNew.id, Title: title, Price: price, Thumbnail: thumbnail }).then(()=>{
                    res.send({Mensaje: 'Producto Actualizado exitosamente'})
                    console.log(`Producto actualizado`,{ ID: objNew.id, Title: title, Price: price, Thumbnail: thumbnail })
                }).catch(err => console.log(err))                    
            }
        }).catch(err => console.log(err))
    }
})

router.delete('/:id', (req, res) => { //Elimina un producto según su id
    let iD = parseInt(req.params.id)
    let objNew = {}

    tablaProductos.getMariaDbById(iD).then((rows)=>{
        for(let row of rows){
            objNew = {
                id: `${row['ID']}`,
                title: `${row['Title']}`, 
                price: `${row['Price']}`, 
                thumbnail: `${row['Thumbnail']}`                
            }
        }

        if(Object.keys(objNew).length === 0){
            res.status(400).json({ error : "Producto no encontrado" });    
        }else{
            tablaProductos.deleteMariaDbById(iD).then(()=>{
                res.send({Mensaje: 'Producto Eliminado exitosamente'})
                console.log(`Producto eliminado`)
            }).catch(err => console.log(err))   
        }
    }).catch(err => console.log(err))   
})

module.exports = {
    router: router,
    productos: productos,
}