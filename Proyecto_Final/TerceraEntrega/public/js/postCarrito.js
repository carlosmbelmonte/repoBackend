let valorCarrito
const btnCrearChart = document.getElementById("crearcarrito")
let botones = document.getElementsByName('btnAddProd')
document.getElementById('mensajeGuardado').style.display = 'none'

btnCrearChart?.addEventListener("click", async() => {
    let objAux= { mailuser: `${document.getElementById('logueoOkmail').textContent}`}
    document.getElementById('crearcarrito').style.display = 'none'
    fetch('/api/carrito', {
        method: 'POST', 
        body: JSON.stringify(objAux),
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
        document.getElementById('mensajeGuardado').style.display = ''
        document.getElementById('objectosenCarrito').innerHTML += `<p>${response.mensaje}</p>`
    });
}

function finalizarCarrito(){
    document.getElementById('objectosenCarrito').innerHTML = ``
    document.getElementById('nroIDCarrito').innerText = ``
    botones.forEach((boton) => {
        boton.style.display = 'none'
    })
    document.getElementById('mensajeGuardado').style.display = 'none'    
    document.getElementById('crearcarrito').style.display = ''
}

