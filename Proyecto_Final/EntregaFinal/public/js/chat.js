const socket = io.connect()

socket.on('allMensajes', chats => { 
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
                    <span class="fw-bold text-primary">[${chat.tipo}]</span> 
                    <span class="fw-bold text-primary">${chat.email}</span> 
                    <span class="text-danger">${chat.fecha}</span>
                    <span class="text-success fst-italic">${chat.mensaje}</span>
                </td>    
            </tr>`
        })        
    }
})

document.getElementById("enviarChat")?.addEventListener("click", () => {
    let mailChat = document.getElementById("mailChat").value;
    let mensajeChat = document.getElementById("mensajeChat").value;
    let usertipo

    if(mailChat===''|| mensajeChat===''){
        document.getElementById("mensajeErrorChat").innerText = "Se debe ingresar todos los campos!!"
        return 0
    }else{    
        if(mailChat !== 'admin@admin.com'){
            usertipo='CLIENTE'
        }else{
            usertipo='ADMIN'
        }          
        document.getElementById("mensajeErrorChat").innerText = ""
        socket.emit('newMensaje', {email: mailChat, mensaje: mensajeChat, fecha: new Date(), tipo: usertipo})
        document.getElementById('formChat').reset()   
    } 
})

