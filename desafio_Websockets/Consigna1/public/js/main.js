const socket = io.connect()
const button = document.getElementById("agregar")

button?.addEventListener("click", ()=>{
    let title = document.getElementById("p_title").value;
    let price = document.getElementById("p_price").value;
    let thumbnail = document.getElementById("p_thumbnail").value;
    document.getElementById('formProducto').reset()
    let producto = {
        "title": title,
        "price": parseInt(price),
        "thumbnail": thumbnail
    }

    if(title===''|| price===NaN ||thumbnail===''){
        document.getElementById("mensajeError").innerText = "No se puede cargar un Producto vacio"
    }else{
        document.getElementById("mensajeError").innerText = ""

        socket.emit('newProducto', producto)
    } 
})

socket.on('allProductos', productos => {   
    //document.getElementById('lista').innerHTML = ''
    productos.forEach( producto => {
        document.getElementById('lista').innerHTML += `
            <tr> 
                <td>${producto.id}</td>
                <td>${producto.title}</td>
                <td>${producto.price}</td>
                <td><img src="${producto.thumbnail}" height="30px"></td>
            </tr>
        `
    })
})
