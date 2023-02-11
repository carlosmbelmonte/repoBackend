import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Users from "../03_services/users.services.js"
import sendmail from "../03_services/utils/sendmail.js"

const usuarios = new Users()

const getUsuariosByEmail = async(req, res) => {  // Devuelve datos del usuario por email.
    let usuarioByEmail = await usuarios.getByEmail(req.params.email)
    if(usuarioByEmail.length === 0){
        return res.send({ error : `No existen usuarios` })    
    }else{
        return res.send({
            id: usuarioByEmail[0].id, 
            nombrefull: usuarioByEmail[0].nombrefull,
            email: usuarioByEmail[0].email,
            direccion: usuarioByEmail[0].direccion,
            edad: usuarioByEmail[0].edad,
            telefono: usuarioByEmail[0].telefono,
            avatar: usuarioByEmail[0].avatar,   
        })    
    }
}

const login = async(req, res) => { //
    const { email, password } = req.body
    let usuarioByEmail = await usuarios.getByEmail(email)
    
    if(!password || !email ){
        return res.status(400).json({ error: "Ingrese todos los datos para loguearse" });
    }else{
        if (usuarioByEmail.length === 0) {
            return res.status(400).json({ error: "Ingrese correctamente el email" });    
        }else{
            if(usuarioByEmail[0].email !== "admin@admin.com"){
                let comparePassword = await bcrypt.compare(password, usuarioByEmail[0].password)
                if(!comparePassword){
                    return res.status(400).json({ error: "Ingrese correctamente la contraseña del CLIENTE" });    
                }else{
                    const token = jwt.sign({ email: usuarioByEmail[0].email, direccion:usuarioByEmail[0].direccion }, 'CLIENTE', { expiresIn: 180 }) //Un valor numerico equivale a Xsegundos
                    return res.send({CLIENTE: token})     
                }                
            }

            if(usuarioByEmail[0].email === "admin@admin.com"){
                if(usuarioByEmail[0].password !== password){
                    return res.status(400).json({ error: "Ingrese correctamente la contraseña del ADMIN" });    
                }else{
                    const token = jwt.sign({ email: usuarioByEmail[0].email }, 'ADMIN', { expiresIn: 360 }) //Un valor numerico equivale a Xsegundos
                    return res.send({ADMIN: token})     
                }                               
            }
        }
    }
}

const signup = async(req, res) => {  //   
    const { nombrefull, password, password2,email, direccion, edad, telefono, avatar} = req.body
    if(!nombrefull || !password || !password2 || !email || !direccion || !edad || !telefono || !avatar){
        return res.status(400).json({ error: "Ingrese todos los datos del usuario" });
    }else{
        if(password !== password2){
            return res.status(400).json({ error: "Debe ingresar la misma contraseña" });
        }else{
            let usuarioByEmail = await usuarios.getByEmail(email)
            if (usuarioByEmail.length === 0) {
                const salt = await bcrypt.genSalt(10)
                const createHash = await bcrypt.hash(password, salt)

                let idUsers = await usuarios.save({nombrefull, password: createHash, email, direccion, edad, telefono, avatar})
                sendmail(
                    {
                        from: `SERVIDOR - ${process.env.TESTMAIL}`,
                        to: `${process.env.TESTMAIL}`,//Quien recibe el maiL
                        subject: 'Nuevo usuario registrado',
                        html: `        
                            <div>
                                <h5>Informacion de Usuario</h5>
                                <ul>
                                    <li>Nombre y Apellido: ${nombrefull}</li>
                                    <li>Edad: ${edad}</li>
                                    <li>Email: ${email}</li>
                                    <li>Direccion: ${direccion}</li>
                                    <li>Telefono: ${telefono}</li>
                                    <li>Avatar (URL): ${avatar}</li>        
                                </ul>
                            </div>`
                    })


                return res.send({mensaje: `Nuevo usuario registrado con ID=${idUsers.id}`}) 
            }else{
                return res.status(400).json({ error: "Ya existe este usuario" });     
            }                        
        }
  
    }  
}


export { getUsuariosByEmail , login, signup }