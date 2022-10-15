const btnLogin = document.getElementById("enviarLogIn")

btnLogin?.addEventListener("click", (evt) => {
    let nombreUserLogIn = document.getElementById("inputLogIn").value
    
    if(nombreUserLogIn===''){
        document.getElementById("mensajeErrorLogIn").innerText = "Se debe ingresar el campo: NOMBRE"
        document.getElementById('inputLogIn').value=''
        evt.preventDefault()
    }else{
        document.getElementById("mensajeErrorLogIn").innerText = ""    
        document.getElementById('inputLogIn').value=''
        document.getElementById('loginPrevio').style.display = 'none'

        fetch('/login', {
            method: 'POST', 
            body: JSON.stringify(
                {
                    user: nombreUserLogIn,
                }
            ),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response)); 
    }    
})