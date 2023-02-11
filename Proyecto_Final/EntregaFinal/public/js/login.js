const gotoLogin = () =>{
    document.getElementById('loginPrevio').style.display = ''
    document.getElementById('loginerror').style.display = 'none'

    document.getElementById('registro').style.display = 'none'
    document.getElementById('registroerror').style.display = 'none' 

    document.getElementById("formLogin").reset()  
}

const gotoRegistro = () =>{
    document.getElementById('loginPrevio').style.display = 'none'
    document.getElementById('loginerror').style.display = 'none'

    document.getElementById('registro').style.display = ''  
    document.getElementById('registroerror').style.display = 'none'  
}

const submitlogin = () => {   
    fetch('/api/usuarios/login', {
        method: 'POST', 
        body: JSON.stringify({
            email: `${document.getElementsByName("emaillogin")[0].value}`,
            password: `${document.getElementsByName("passwordlogin")[0].value}` 
        }),
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .catch(error => { console.error('Error:', error) })
        .then(response =>  {
            console.log(response)
            if(response.error){ 
                document.getElementById('loginPrevio').style.display = 'none'
                document.getElementById('registro').style.display = 'none'
                document.getElementById('loginerror').style.display = ''
                document.getElementById('registroerror').style.display = 'none' 
                document.getElementById('msjErrorLogin').innerText = `${response.error}`
            }
            if(!response.error){
                document.getElementById('msjPostRegistro').innerText =''
            }
        })
}

const submitregister = () => {
    fetch('/api/usuarios/signup', {
        method: 'POST', 
        body: JSON.stringify({
            nombrefull:`${document.getElementsByName("usernameregistro")[0].value}`,
            password: `${document.getElementsByName("passwordregistro")[0].value}`,
            password2: `${document.getElementsByName("password2registro")[0].value}`,
            email: `${document.getElementsByName("emailregistro")[0].value}`, 
            direccion: `${document.getElementsByName("addressregistro")[0].value}`, 
            edad: `${document.getElementsByName("ageregistro")[0].value}`, 
            telefono: `${document.getElementsByName("phoneregistro")[0].value}`, 
            avatar:  `${document.getElementsByName("avatarregistro")[0].value}`           
        }),
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .catch(error => { console.error('Error:', error) })
        .then(response =>  {
            console.log(response)
            if(response.error){ 
                document.getElementById('loginPrevio').style.display = 'none'
                document.getElementById('registro').style.display = 'none'
                document.getElementById('loginerror').style.display = 'none'
                document.getElementById('registroerror').style.display = '' 
                document.getElementById('msjErrorSignup').innerText = `${response.error}`
            }
            if(response.mensaje){
                document.getElementById("formRegistro").reset()
                document.getElementById('msjPostRegistro').innerText ='Registro con exito, ahora debe loguearse'
                gotoLogin()    
            }
        })
}