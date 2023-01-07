const { get, post, deleteId, put } = require('../cliente')

const main = async() => {
    console.log(">>>> Mostrar todos los productos <<<<")
    const getProductos = await get()
    console.log(getProductos.data)

    console.log(">>>> Agregar un producto <<<<")
    const postProductos = await post({"nombre": "Carlos Belmonte","descripcion": "Medidor Persona","codigo": "29101990","foto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-64.png","precio": "32 usd","stock": "1 unidades"})
    console.log(postProductos.data)

    console.log(">>>> Actualizar un producto <<<<")
    const xproducts = await get()
    const putProductos = await put(parseInt(xproducts.data[xproducts.data.length - 1].id),{"nombre": "Carlos Mariano Belmonte","descripcion": "Apellido Persona","codigo": "29101990","foto": "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Batman-64.png","precio": "32 usd","stock": "1 unidades"})
    console.log(putProductos.data)
    
    console.log(">>>> Eliminar un producto <<<<")
    const yproducts = await get()
    const deleteProducto = await deleteId(parseInt(yproducts.data[yproducts.data.length - 1].id))
    console.log(deleteProducto.data)
}

main()