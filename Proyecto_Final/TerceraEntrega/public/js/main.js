var socket = io.connect()
document.getElementById('productosDisponibles').style.display = 'none'
document.getElementById('informacionPersonal').style.display = 'none'

const btnShowProducts = document.getElementById("showProducts")
const btnShowPersonal = document.getElementById("showPersonal")
const btnShowChart = document.getElementById("showChart")

btnShowProducts?.addEventListener("click", () => {
    document.getElementById('productosDisponibles').style.display = ''
    document.getElementById('informacionPersonal').style.display = 'none'
})

btnShowPersonal?.addEventListener("click", () => {
    document.getElementById('productosDisponibles').style.display = 'none'
    document.getElementById('informacionPersonal').style.display = ''
})

btnShowChart?.addEventListener("click", () => {
    document.getElementById('productosDisponibles').style.display = 'none'
    document.getElementById('informacionPersonal').style.display = 'none'
})

socket.on('allProductos', productos => { 
    console.log("array en consola[productos]",productos) 
    if(productos.length === 0){
        document.getElementById('msgProducto').style.display = ''    
        document.getElementById('tablaProducto').style.display = 'none';
    }
    if(productos.length>0){
        document.getElementById('msgProducto').style.display = 'none'    
        document.getElementById('tablaProducto').style.display = '';
        document.getElementById('lista').innerHTML = ''  
        productos.forEach( producto => {
        document.getElementById('lista').innerHTML += `
            <tr class="table-dark"> 
                <td class="table-dark">${producto.id}</td>
                <td class="table-dark">${producto.nombre}</td>
                <td class="table-dark">${producto.descripcion}</td>
                <td class="table-dark">${producto.precio}</td>
                <td class="table-dark">
                    <img src="${producto.foto}" height="48px">
                </td>
            </tr>`
        })  
    }  
})