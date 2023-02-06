import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Users from "../03_services/users.services.js"

const usuarios = new Users()

const getUsuarios = async(req, res) => {  // Devuelve todos los usuarios.
    let allUsuarios = await usuarios.getAll()
    if(allUsuarios.length === 0){
        res.send({ error : `No existen usuarios` })    
    }else{
        res.send(allUsuarios)    
    }
}

const login = async(req, res) => { //
    const { email, password } = req.body
    let usuarioByEmail = await usuarios.getByEmail(email)
    
    if(!password || !email ){
        res.status(400).json({ error: "Ingrese todos los datos para loguearse" });
    }else{
        if (usuarioByEmail.length === 0) {
            res.status(400).json({ error: "Ingrese correctamente el email" });    
        }else{
            let comparePassword = await bcrypt.compare(password, usuarioByEmail[0].password)
            if(!comparePassword){
                res.status(400).json({ error: "Ingrese correctamente la contraseña" });    
            }else{
                const token = jwt.sign({ email: usuarioByEmail[0].email }, 'shhhhhhh', { expiresIn: 120 }) //Un valor numerico equivale a Xsegundos
                res.send({token})     
            }
        }
    }
}

const signup = async(req, res) => {  //   
    const { nombrefull, password, password2,email, adress, age, phone, avatar} = req.body
    if(!nombrefull || !password || !password2 || !email || !adress || !age || !phone || !avatar){
        res.status(400).json({ error: "Ingrese todos los datos del usuario" });
    }else{
        if(password !== password2){
            res.status(400).json({ error: "Debe ingresar la misma contraseña" });
        }else{
            let usuarioByEmail = await usuarios.getByEmail(email)
            if (usuarioByEmail.length === 0) {
                const salt = await bcrypt.genSalt(10)
                const createHash = await bcrypt.hash(password, salt)

                let idUsers = await usuarios.save({nombrefull, password: createHash, email, adress, age, phone, avatar})
                res.send({mensaje: `Nuevo usuario registrado con ID=${idUsers.id}`}) 
            }else{
                 res.status(400).json({ error: "Ya existe este usuario" });     
            }                        
        }
  
    }  
}


export { getUsuarios , login, signup }