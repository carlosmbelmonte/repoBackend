const assert = require('assert')
const { get, put, deleteId, post } = require('../cliente')

describe('Prueba MOCHA', function () {

  it('GET para todos los productos, retorna status 200 y un array', async function () {
    const { status, data } = await get()
    assert.equal(status, 200)
    assert.equal(typeof (data), 'object')
  })

  it('POST de un producto, retorna status 200 y un objecto con su ID asignado', async function () {
    const { status, data } = await post({"nombre": "Carlos Belmonte","descripcion": "Medidor Persona","codigo": "29101990","foto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-64.png","precio": "32 usd","stock": "1 unidades"})
    assert.equal(status, 200)
    assert.equal(typeof (data), 'object')
    assert.equal(JSON.stringify(data), JSON.stringify({ id: parseInt(data.id) }))
  })

  it('PUT de un producto por su ID, retorna status 200 y un objeto con un mensaje de exito', async function () {
    const xproducts = await get()
    const { status, data } = await put(parseInt(xproducts.data[xproducts.data.length - 1].id),{"nombre": "Sandra Machado","descripcion": "Apellido Persona","codigo": "29101990","foto": "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Batman-64.png","precio": "32 usd","stock": "1 unidades"})
    assert.equal(status, 200)
    assert.equal(typeof (data), 'object')
    assert.equal(JSON.stringify(data), JSON.stringify({ respuesta: 'Dato actualizado exitosamente' }))
  })

  it('DELETE de un producto por su ID, retorna status 200 y un objeto con un mensaje de exito', async function () {
    const yproducts = await get()
    const { status, data } = await deleteId(parseInt(yproducts.data[yproducts.data.length - 1].id))
    assert.equal(status, 200)
    assert.equal(typeof (data), 'object')
    assert.equal(JSON.stringify(data), JSON.stringify({ respuesta: 'ID eliminado exitosamente' }))
  })

})