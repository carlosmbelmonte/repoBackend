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

async function addProductos(idrecibido) {
    
    let objAux= { idProducto: parseInt(idrecibido)}
    console.log("idrecibido producto: ",objAux)

    fetch(`/api/carrito/${valorCarrito}/productos`, {
        method: 'POST', 
        body: JSON.stringify(objAux),
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        console.log('Success:', response)
        document.getElementById('objectosenCarrito').innerHTML += `<p>${response.mensaje}</p>`
    });
}


