let valorCarrito
const btnCrearChart = document.getElementById("crearcarrito")
let botones = document.getElementsByName('btnAddProd')
document.getElementById('mensajeGuardado').style.display = 'none'

btnCrearChart?.addEventListener("click", async() => {
    let objAux= { mailuser: `${document.getElementById('logueoOkmail').textContent}`}
    document.getElementById('crearcarrito').style.display = 'none'
    fetch('/api/carritos', {
        method: 'POST', 
        body: JSON.stringify(objAux),
        headers: {'Content-Type': 'application/json','auth-token':`${sessionStorage.getItem("Cliente")}`}
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response =>  {
            if(response.error){ 
                console.log(response) 
                document.getElementById('crearcarrito').style.display = ''   
            }else{
                console.log(response)
                valorCarrito= response.id
                document.getElementById('nroIDCarrito').innerText = `Se crea el carrito con ID ${valorCarrito}`
                botones.forEach((boton) => { boton.style.display = '' })                
            }})  
})

async function addProductos(idrecibido) {
    fetch(`/api/carritos/${valorCarrito}/productos/${idrecibido}`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json','auth-token':`${sessionStorage.getItem("Cliente")}`}
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response)
            let items = response.ProductosEnCarrito.map(item => `Producto: ${item.producto.nombre} Cantidad: ${item.cantidad} <br/>` );
            document.getElementById('mensajeGuardado').style.display = ''
            document.getElementById('objectosenCarrito').innerHTML = `<p>${items.join('')}</p>`
        })
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

