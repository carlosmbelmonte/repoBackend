const btnRegister = document.getElementById("enviarRegistro")

btnRegister?.addEventListener("click", (evt) => {
    let aliasRegister = document.getElementById("inputRegistroAlias").value
    let mailRegister = document.getElementById("inputRegistroMail").value
    let passwordRegister = document.getElementById("inputRegistroPassword").value

    if(aliasRegister!=='' || mailRegister!=='' || passwordRegister!==''){
        evt.preventDefault()
        document.getElementById('inputRegistroAlias').value=''
        document.getElementById("inputRegistroMail").value=''
        document.getElementById("inputRegistroPassword").value=''

        fetch('/register', {
            method: 'POST', 
            body: JSON.stringify(
                {
                    userAlias: aliasRegister,
                    userEmail: mailRegister,
                    userPass: passwordRegister
                }
            ),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
            .catch(error => console.error('Error con el registro:', error))
            .then(response => console.log('Success:', response))
        window.location.href='/register'
    }
})

document.getElementById("gotoLogin")?.addEventListener("click", () => {
    window.location.href='/login2'
})