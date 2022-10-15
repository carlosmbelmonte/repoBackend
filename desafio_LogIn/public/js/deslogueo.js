const btnDesloguear = document.getElementById("desloguear")

btnDesloguear?.addEventListener("click", () => {
    fetch('/login', {
        method: 'POST', 
        body: JSON.stringify(
            {
                user: '',
                flag: true
            }
        ),
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response)); 
})