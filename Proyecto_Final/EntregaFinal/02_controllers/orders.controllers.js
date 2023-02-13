import Orders from "../03_services/orders.services.js"
import Carts from "../03_services/carts.services.js"
import sendmail from "../03_services/utils/sendmail.js"

const ordenes = new Orders()
const carritos = new Carts()

const getOrders = async(req, res) => {
    let allOrdenes = await ordenes.getAll()
    if(allOrdenes.length === 0){
        return res.send({ error : `No existen ordenes` })    
    }else{
        return res.send(allOrdenes)    
    }
}

const getOrderById = async(req, res) => { //Devuelve una orden según su id
    let getOrder = await ordenes.getById(parseInt(req.params.id))
    if (getOrder.length === 0) {
        return res.send({ error : `No existe orden con ID=${parseInt(req.params.id)} `})
    }else{
        return res.send(getOrder[0])
    }
}

const postOrder = async(req, res) => {  // Devuelve el ID de la orden agregada   
    let getCart = await carritos.getById(parseInt(req.params.idCart))
    let data = []
    let count = 0
    let emailToken = req.email
    let msjAux=''

    if (getCart.length === 0) {//Chequeo si existe el carrito
        return res.send({ error : `No existe carrito con ID=${parseInt(req.params.idCart)} `})
    }
    if (getCart[0].productos.length === 0){////Chequeo que el carrito contenga productos
        return res.send({ error : `No se puede generar una Orden con el carrito vacio`})
    }
    if(getCart[0].email !== emailToken){//Chequeo si el usuario tiene acceso a ese carrito
        return res.send({ error : `El usuario ${emailToken} no tiene un carrito con ID=${parseInt(req.params.idCart)}`})
    }else{
        for(let i = 0; i < getCart[0].productos.length; i++){
            let auxObj = {
                cantidad: getCart[0].productos[i].cantidad,
                nombre: getCart[0].productos[i].producto.nombre,
                descripcion: getCart[0].productos[i].producto.descripcion,
                foto: getCart[0].productos[i].producto.foto,
                preciounitario: getCart[0].productos[i].producto.precio,
                subtotal: getCart[0].productos[i].cantidad * getCart[0].productos[i].producto.precio
            }
            data.push(auxObj)
            count += data[i].subtotal
            msjAux +=`<ul>Producto ${i+1}:
                <li>Producto: ${data[i].nombre}</li>
                <li>Cantidad: ${data[i].cantidad}</li>
                <li>Descripcion: ${data[i].descripcion}</li>
                <li>PrecioUnitario: ${data[i].preciounitario}</li>
                <li>SubTotal: ${data[i].subtotal}</li></ul>` 
        } 
        
        let objOrden = {
            item: data,
            preciototal: count,
            'timestamp(ordenes)': new Date(),
            estado: "generado",
            email: getCart[0].email,
            direccion: getCart[0].direccion      
        }

        let idOrder = await ordenes.save(objOrden)

        let mensajeHtml = `
        <div>
            <h5>Informacion del pedido</h5>
            <ul>
                <li>ID Orden: ${idOrder.id}</li>
                <li>Email: ${objOrden.email}</li>
                <li>Direccion: ${objOrden.direccion}</li>
                <li>PrecioTotal: ${objOrden.preciototal}</li>
                <li>Fecha: ${objOrden["timestamp(ordenes)"]}</li>
                <li>Estado: ${objOrden.estado}</li>      
            </ul>
            <h5>Informacion de los Productos</h5>
            ${msjAux}
        </div>` 

        sendmail({
            from: `SERVIDOR - ${process.env.TESTMAIL}`,
            to: `${process.env.TESTMAIL}`,//Quien recibe el maiL
            subject: 'Nuevo pedido generado',
            html: mensajeHtml
        })
        return res.send(idOrder)               
    }
    
    
}

const deleteOrderById = async(req, res) => {
    let getOrder = await ordenes.getById(parseInt(req.params.id)) 
    let emailToken = req.email 

    if (getOrder.length === 0) {//Chequeo si existe el carrito
        return res.send({ error : `No existe orden con ID=${parseInt(req.params.id)} `})        
    }
    
    if(getOrder[0].email !== emailToken){//Chequeo si el usuario tiene acceso a esa orden
        return res.send({ error : `El usuario ${emailToken} no tiene una orden con ID=${parseInt(req.params.id)} `})
    }else{
        let deleteiDOrder = await ordenes.deleteById(parseInt(req.params.id))   
        return res.send(deleteiDOrder)        
    }    
}

const getOrderByEmail = async(req, res) => {
    let ordenesByEmail = await ordenes.getByEmail(req.params.email)
    if(ordenesByEmail.length === 0){
        return res.send({ error : `No existen ordenes para este mail` })    
    }else{
        return res.send(ordenesByEmail)    
    }
}

export { getOrders, getOrderById, postOrder, deleteOrderById, getOrderByEmail }
