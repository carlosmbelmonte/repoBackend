var socket = io.connect()
const { denormalize, schema } = normalizr//---->Para Normalizr

const button = document.getElementById("agregar")
const chatButton = document.getElementById("enviarChat")

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}
  
const formatDate = (date) => {
    return (
    [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/') +
    ' ' +
    [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
    ].join(':')
    );
}

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
                <td class="table-dark">${producto.title}</td>
                <td class="table-dark">${producto.price}</td>
                <td class="table-dark">
                    <img src="${producto.thumbnail}" height="48px">
                </td>
            </tr>`
        })  
    }  
})

chatButton?.addEventListener("click", () => {
    let mailChat = document.getElementById("mailChat").value;
    let nombreChat = document.getElementById("nombreChat").value;
    let apellidoChat = document.getElementById("apellidoChat").value;
    let edadChat = document.getElementById("edadChat").value;
    let aliasChat = document.getElementById("aliasChat").value;
    let avatarChat = document.getElementById("avatarChat").value;
    let mensajeChat = document.getElementById("mensajeChat").value;

    document.getElementById('formChat').reset()

    let newChat = {
        "author": {
            "id": mailChat,
            "nombre": nombreChat,
            "apellido": apellidoChat,
            "edad": edadChat,
            "alias": aliasChat,
            "avatar": avatarChat
        },
        "text": mensajeChat,
        "fecha": formatDate(new Date())        
    }

    if(mailChat===''|| mensajeChat==='' || nombreChat==='' || apellidoChat===''){
        document.getElementById("mensajeErrorChat").innerText = "Se debe ingresar los campos: MAIL-MENSAJE-NOMBRE-APELLIDO"
    }else{
        document.getElementById("mensajeErrorChat").innerText = ""
        //console.log(newChat)  
        socket.emit('newMensaje', newChat)   
    } 
})

socket.on('allMensajes', normalizrChats => {
    const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'id' }) //---->Para Normalizr
    const messageSchema = new schema.Entity('messages', { author: authorSchema }, { idAttribute: '_id' }) //---->Para Normalizr
    const denormalizedMessages = denormalize(normalizrChats.result, [messageSchema], normalizrChats.entities)//---->Para Normalizr

    const chats = denormalizedMessages//---->Para Normalizr

    console.log("Tamaño objeto normalizado: ",JSON.stringify(normalizrChats).length)
    console.log("Tamaño objeto original: ",JSON.stringify(chats).length);
    console.log("array en consola[chats]",chats)

    
    
    if(chats.length === 0){   
        document.getElementById('tablaChat').style.display = 'none';
    }
    if(chats.length>0){
        document.getElementById('tablaChat').style.display = '';    
        document.getElementById('listaChats').innerHTML = ''  
        chats.forEach( chat => {
        document.getElementById('listaChats').innerHTML += `
            <tr> 
                <td>
                    <span class="fw-bold text-primary">${chat.author.id}</span> 
                    <span class="text-danger">[${chat.fecha}]: </span>
                    <span class="text-success fst-italic">${chat.text}</span>
                    <img src="${chat.author.avatar}" height="48px">
                </td>  
            </tr>`
        })

        const porcentajeDeCompresion = ((JSON.stringify(normalizrChats).length * 100) / JSON.stringify(chats).length).toFixed(2)
        console.log(`El porcentaje de compresión es del ${porcentajeDeCompresion}%`)    
        document.getElementById("formLegend").innerText = `Centro de Mensajes (Compresión: ${porcentajeDeCompresion}%)`   
    }
})

const radioButtons = document.querySelectorAll('input[name="showForm"]');
for(const radioButton of radioButtons){
    radioButton.addEventListener('change', function(e) {
        document.getElementById('showFormYes').checked ? (
            document.getElementById('formChat').style.display = '',
            document.getElementById('enviarChat').style.display = ''
        ) : (
            document.getElementById('formChat').style.display = 'none',
            document.getElementById('enviarChat').style.display = 'none'
        )
      }
    );
}