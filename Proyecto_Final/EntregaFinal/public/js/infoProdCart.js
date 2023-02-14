window.addEventListener("load", function(event) {
    document.getElementById('chatGeneral').style.display = 'none' 
    document.getElementById('productosCarrito').style.display = 'none'
    
    if(sessionStorage.getItem("Cliente")||sessionStorage.getItem("Admin")){
        document.getElementById('navInfo').style.display = ''
        document.getElementById('productosDisponibles').style.display = '' 
        listarProductos()    
    }
    if(sessionStorage.getItem("Admin")){
        document.getElementById('logueoOkmail').innerHTML = 'admin@admin.com'
        document.getElementById('showPersonal').style.display = 'none' 
        document.getElementById('showChart').style.display = 'none'
        document.getElementById('crearcarrito').style.display = 'none'
        expiracion(sessionStorage.getItem("Admin"))
    }
    if(sessionStorage.getItem("Cliente")){
        mostrarUsuario()
        expiracion(sessionStorage.getItem("Cliente"))
    }    
})

document.getElementById("desloguear")?.addEventListener("click", () => {
    sessionStorage.clear()
    document.getElementById('navInfo').style.display = 'none' 
    document.getElementById('productosDisponibles').style.display = 'none' 
    sessionStorage.setItem("deslogueado", 'OK') 
    window.location.href='/logout'
})

const listarProductos = () => {
    fetch('/api/productos')
        .then(res => res.json())
        .then( 
            productos => {
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
        )
}

const mostrarUsuario = () => {
    fetch(`/api/usuarios/${parseJwt(sessionStorage.getItem("Cliente")).email}`)
        .then(res => res.json())
        .then( 
            respuesta => {
                document.getElementById('logueoOkuser').innerHTML = `${respuesta.nombrefull}`
                document.getElementById('logueoOkmail').innerHTML = `${respuesta.email}`
                
                document.getElementById('infoperNombre').innerHTML = `Nombre y Apellido: ${respuesta.nombrefull}`
                document.getElementById('infoperEdad').innerHTML = `Edad: ${respuesta.edad}`
                document.getElementById('infoperEmail').innerHTML = `Email: ${respuesta.email}`
                document.getElementById('infoperDir').innerHTML = `Direccion: ${respuesta.direccion}`
                document.getElementById('infoperTel').innerHTML = `Telefono: ${respuesta.telefono}`
                document.getElementById('infoperAvatar').innerHTML = `<img src=" ${respuesta.avatar}" class="img-fluid rounded-start" alt="...">`
            })
    
}

function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function expiracion (token){
    let auxObj = parseJwt(token)
    let expire = (parseInt(auxObj.exp)- parseInt(auxObj.iat))*1000 //valor en segundos
    console.log(expire)
    setTimeout(() => {
        sessionStorage.clear()
        document.getElementById('navInfo').style.display = 'none' 
        document.getElementById('productosDisponibles').style.display = 'none'
        sessionStorage.setItem("deslogueado", 'OK') 
        window.location.href='/logout'
    }, expire)
}

document.getElementById("showProducts")?.addEventListener("click", () => {
    document.getElementById('productosDisponibles').style.display = ''  
    document.getElementById('informacionPersonal').style.display = 'none'  
    document.getElementById('productosCarrito').style.display = 'none' 
    document.getElementById('chatGeneral').style.display = 'none'      
})

document.getElementById("showPersonal")?.addEventListener("click", () => {
    document.getElementById('productosDisponibles').style.display = 'none'  
    document.getElementById('informacionPersonal').style.display = ''   
    document.getElementById('productosCarrito').style.display = 'none'
    document.getElementById('chatGeneral').style.display = 'none'      
})

document.getElementById("showChart")?.addEventListener("click", () => {
    document.getElementById('productosDisponibles').style.display = 'none'  
    document.getElementById('informacionPersonal').style.display = 'none'   
    document.getElementById('productosCarrito').style.display = ''
    document.getElementById('chatGeneral').style.display = 'none' 
    
    fetch(`/api/ordenes/email/${parseJwt(sessionStorage.getItem("Cliente")).email}`)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        if(response.error){ 
            document.getElementById('listarOrdenes').innerHTML = `<p>No tiene ordenes realizadas</p>`  
        }else{
            let items = response.map(item =>    
            `<div>
                <h5>Informacion del pedido</h5>
                <ul>
                    <li>ID Orden: ${item.id}</li>
                    <li>Item: ${item.item.map(aux => `Producto: ${aux.nombre}<-->Cant: ${aux.cantidad} `)}</li>
                    <li>Direccion: ${item.direccion}</li>
                    <li>PrecioTotal: ${item.preciototal}</li>
                    <li>Fecha: ${item["timestamp(ordenes)"]}</li>
                    <li>Estado: ${item.estado}</li>      
                </ul>
            </div>`
            )
            document.getElementById('listarOrdenes').innerHTML = `<p>${items.join('')}</p>`            
        }

    })

})

document.getElementById("showChat")?.addEventListener("click", () => {
    document.getElementById('productosDisponibles').style.display = 'none'  
    document.getElementById('informacionPersonal').style.display = 'none'   
    document.getElementById('productosCarrito').style.display = 'none'
    document.getElementById('chatGeneral').style.display = ''      
})