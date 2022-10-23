document.getElementById("failRegister")?.addEventListener("click", () => {
    fetch('/register', {
        method: 'POST', 
        body: JSON.stringify(
            {
                flagbtn: "true"
            }
        ),
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .catch(error => console.error('Error con el registro:', error))
        .then(response => console.log('Success:', response))    
    window.location.href='/register'
})