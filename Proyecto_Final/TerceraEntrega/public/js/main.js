var socket = io.connect()
var flagSms = false
document.getElementById('productosDisponibles').style.display = 'none'
document.getElementById('informacionPersonal').style.display = 'none'
document.getElementById('productosCarrito').style.display = 'none'

const btnShowProducts = document.getElementById("showProducts")
const btnShowPersonal = document.getElementById("showPersonal")
const btnShowChart = document.getElementById("showChart")
/*const btnEndChart = document.getElementById("endChart")

btnEndChart?.addEventListener("click", async() => {
    socket.emit('smstexto', 'true')
})*/

btnShowProducts?.addEventListener("click", () => {
    document.getElementById('productosDisponibles').style.display = ''
    document.getElementById('informacionPersonal').style.display = 'none'
    document.getElementById('productosCarrito').style.display = 'none'
})

btnShowPersonal?.addEventListener("click", () => {
    document.getElementById('productosDisponibles').style.display = 'none'
    document.getElementById('informacionPersonal').style.display = ''
    document.getElementById('productosCarrito').style.display = 'none'
})

btnShowChart?.addEventListener("click", () => {
    document.getElementById('productosDisponibles').style.display = 'none'
    document.getElementById('informacionPersonal').style.display = 'none'
    document.getElementById('productosCarrito').style.display = ''

    fetch(`/api/carrito/mail/${document.getElementById('logueoOkmail').textContent}`)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        document.getElementById('listaCarrito').innerHTML = ''
        console.log('Success:', response)
        for(let i = 0; i<response.length;i++){
            document.getElementById('listaCarrito').innerHTML += `
            <div class="mb-3 row">
                <div id="tabla${response[i].id}" class="col-10">
                    <table class="table table-dark table-striped">
                        <thead>
                            <th style="width: 10%">ID del Carrito</th>
                            <th style="width: 15%">Imagen</th>
                            <th style="width: 20%">Producto</th>
                            <th style="width: 40%">Descripcion</th>
                            <th style="width: 15%">Precio</th>
                        </thead>
                        <tbody id="tablaBody${response[i].id}">

                        </tbody>
                    </table>
                </div>
                <div id="botonera${response[i].id}" class="d-flex align-items-center col-2">
                    <button onclick="endChart(${response[i].id})" class="btn btn-warning">Finalizar Carrito ID:${response[i].id}</button>   
                </div> 
            </div>           
            `

            for(let j=0; j<response[i].productos.length;j++){
                document.getElementById(`tablaBody${response[i].id}`).innerHTML += `
                    <tr class="table-dark"> 
                        <td id="idChartTabla${response[i].id}" class="table-dark">${response[i].id}</td>
                        <td class="table-dark">
                            <img src="${response[i].productos[j].foto}" height="48px">
                        </td>
                        <td class="table-dark">${response[i].productos[j].nombre}</td>
                        <td class="table-dark">${response[i].productos[j].descripcion}</td>
                        <td class="table-dark">${response[i].productos[j].precio}</td>
                    </tr>                                    
                `                
            }
        }
    });    
})

function endChart(varChart){
    let auxObj={}
    fetch(`/api/carrito/${varChart}/productos`)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        auxObj = {
            nombre: document.getElementById('logueoOkuser').textContent,
            mail: document.getElementById('logueoOkmail').textContent,
            idCarrito: varChart,
            cantProd: response.length,
            productos:[]
        }
       
        for(let i=0; i<response.length; i++){
            auxObj.productos[i]={
                producto:response[i].nombre,
                precio:response[i].precio,
                descripcion:response[i].descripcion
            }
        }
        console.log(auxObj)
        socket.emit('mailCarrito', auxObj)
    })
}

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
                <td>
                    <button onclick="addProductos(${producto.id})" name="btnAddProd" class="btn btn-success" id="agregarprodcarrito${producto.id}" style="display: none;">Agregar al Carrito</button>
                </td>
            </tr>`
        })  
    }  
})
