var socket = io.connect()

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