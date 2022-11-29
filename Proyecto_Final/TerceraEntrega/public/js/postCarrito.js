let valorCarrito
const btnCrearChart = document.getElementById("crearcarrito")
let botones = document.getElementsByName('btnAddProd')

btnCrearChart?.addEventListener("click", async() => {
    document.getElementById('crearcarrito').style.display = 'none'
    fetch('/api/carrito', {
        method: 'POST', 
        
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response =>  {
            //console.log(response)
            valorCarrito= response.id
            document.getElementById('nroIDCarrito').innerText = `Se crea el carrito con ID ${valorCarrito}`
            
            botones.forEach((boton) => {
                boton.style.display = ''
            })
        }); 
})

async function addProductos() {
    //document.getElementById("demo").innerHTML = "Hello World";
    console.log("aca vemos el valor del carrito: ",valorCarrito )
    fetch(`/api/carrito/${valorCarrito}/productos`, {
        method: 'POST', 
        body: JSON.stringify({idProducto: 3}),
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}


