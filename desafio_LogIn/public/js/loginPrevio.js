const btnLogin = document.getElementById("enviarLogIn")


btnLogin?.addEventListener("click", (evt) => {
    let nombreUserLogIn = document.getElementById("inputLogIn").value

    if(nombreUserLogIn!==''){
        evt.preventDefault()
        document.getElementById('inputLogIn').value=''
        fetch('/login', {
            method: 'POST', 
            body: JSON.stringify(
                {
                    user: nombreUserLogIn,
                }
            ),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
            .catch(error => console.error('Error con el logueo:', error))
            .then(response => console.log('Success:', response))
        window.location.href='/home'
    }
})