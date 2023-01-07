const axios = require('axios')

async function get() {
    try {
        const respuesta = await axios.get('http://localhost:8080/api/productos-test')
        return respuesta
    } catch (error) {
        return error
    }
}
async function post(obj) {
    try {
        const respuesta = await axios.post('http://localhost:8080/api/productos-test',obj)
        return respuesta
    } catch (error) {
        return error
    }
}

async function deleteId(x) {
    try {
        const respuesta = await axios.delete(`http://localhost:8080/api/productos-test/${x}`)
        return respuesta
    } catch (error) {
        return error
    }
}

async function put(x,obj) {
    try {
        const respuesta = await axios.put(`http://localhost:8080/api/productos-test/${x}`,obj)
        return respuesta
    } catch (error) {
        return error
    }
}

module.exports = {
    get,
    post,
    deleteId,
    put
}