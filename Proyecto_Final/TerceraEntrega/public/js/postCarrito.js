let valorCarrito
const btnCrearChart = document.getElementById("crearcarrito")

btnCrearChart?.addEventListener("click", async() => {
    document.getElementById('crearcarrito').style.display = 'none'
    fetch('/api/carrito', {
        method: 'POST', 
        
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response =>  {
            console.log(response)
            document.getElementById('nroIDCarrito').innerText = `Se crea el carrito con ID ${response.id}`
        }); 

})


