const request = require('supertest')
const req = request('http://localhost:8080/api/productos-test')
let arrayLong

describe('Prueba SUPERTEST', () => {
    it('GET para todos los productos, retorna status 200', (done) => {
        req.get("/")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done)
    })

    it('POST de un producto, retorna status 200', (done) => {
        req.post("/")
        .send({"nombre": "Carlos Belmonte","descripcion": "Medidor Persona","codigo": "29101990","foto": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-64.png","precio": "32 usd","stock": "1 unidades"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(function(res){
            arrayLong = parseInt(res.body.id)
        })
        .expect(200, done)
    })

    it('PUT de un producto por su ID, retorna status 200 y un objeto con un mensaje de exito', (done) => {
        req.put(`/${arrayLong}`)
        .send({"nombre": "Sandra Machado","descripcion": "Apellido Persona","codigo": "29101990","foto": "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Batman-64.png","precio": "32 usd","stock": "1 unidades"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect({ respuesta: 'Dato actualizado exitosamente' })
        .end((err) => {
            if (err) return done(err)
            done()
        })
    })

    it('DELETE de un producto por su ID, retorna status 200 y un objeto con un mensaje de exito', (done) => {
        req.delete(`/${arrayLong}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({ respuesta: 'ID eliminado exitosamente' }, done)
    })

})