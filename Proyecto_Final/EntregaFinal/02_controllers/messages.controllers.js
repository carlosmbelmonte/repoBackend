import Messages from "../03_services/messages.services.js"

const mensajes = new Messages()

const getMensajes = async(req, res) => {  // Devuelve todos los mensajes.
    let allMensajes = await mensajes.getAll()
    if(allMensajes.length === 0){
        return res.send({ error : `No existen mensajes` })    
    }else{
        return res.send(allMensajes)    
    }
}

const postMensajes = async(req, res) => { //Crea un nuevo mensaje
    const { email, mensajecuerpo, password } = req.body
    let usertipo = ''

    if(email !== 'admin@admin.com'){
        usertipo='CLIENTE'
    }
    if(email === 'admin@admin.com' && password !== 'admin'){
        return res.status(400).json({ error: "Debe ingresar la contraseña del administrador" })
    }
    if(email === 'admin@admin.com' && password === 'admin'){
        usertipo='ADMIN'
    }


    if(!mensajecuerpo){
        return res.status(400).json({ error: "No se puede ingresar un mensaje vacio" });
    }else{
        let idMsj = await mensajes.save({
            email: email, 
            tipo: usertipo, 
            fecha: new Date(), 
            mensaje: mensajecuerpo
        })
        let allMensajes = await mensajes.getAll() 
        return res.send(allMensajes)       
    }

}

const getMensajesByEmail = async(req, res) => { //Devuelve los mensajes segun su email
    let mensajesByEmail = await mensajes.getByEmail(req.params.email)
    if (mensajesByEmail.length === 0) {
        return res.send({ error : `No existen mensajes para el mail=${req.params.email} `})
    }else{
        return res.send(mensajesByEmail)
    }
}

export { getMensajes, postMensajes, getMensajesByEmail }