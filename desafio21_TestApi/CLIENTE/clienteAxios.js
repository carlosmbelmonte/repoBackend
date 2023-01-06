const axios = require('axios')

async function get() {
    try {
        const respuesta = await axios.get('http://localhost:8080/api/productos-test')
        return respuesta.data
    } catch (error) {
        return error
    }
}
async function post(obj) {
    try {
        const respuesta = await axios.post('http://localhost:8080/api/productos-test',obj)
        return respuesta.data
    } catch (error) {
        return error
    }
}

async function deleteId(x) {
    try {
        const respuesta = await axios.delete(`http://localhost:8080/api/productos-test/${x}`)
        return respuesta.data
    } catch (error) {
        return error
    }
}

async function put(x,obj) {
    try {
        const respuesta = await axios.put(`http://localhost:8080/api/productos-test/${x}`,obj)
        return respuesta.data
    } catch (error) {
        return error
    }
}


const main = async() => {
    console.log(">>>> Mostrar todos los productos <<<<")
    const getProductos = await get()
    console.log(getProductos)

    console.log(">>>> Agregar un producto <<<<")
    const postProductos = await post({"nombre": "Carlos Belmonte","descripcion": "Medidor Persona","codigo": "29101990","foto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-64.png","precio": "32 usd","stock": "1 unidades"})
    console.log(postProductos)

    console.log(">>>> Actualizar un producto <<<<")
    const xproducts = await get()
    const putProductos = await put(parseInt(xproducts[xproducts.length - 1].id),{"nombre": "Carlos Mariano Belmonte","descripcion": "Apellido Persona","codigo": "29101990","foto": "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Batman-64.png","precio": "32 usd","stock": "1 unidades"})
    console.log(putProductos)
    
    console.log(">>>> Eliminar un producto <<<<")
    const yproducts = await get()
    const deleteProducto = await deleteId(parseInt(yproducts[yproducts.length - 1].id))
    console.log(deleteProducto)
}

main()

module.exports = {
    get,
    post,
    deleteId,
    put
}