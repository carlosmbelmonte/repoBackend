import { clienteSms } from './smsSender/index.js'

const btnEndChart = document.getElementById("endChart")

btnEndChart?.addEventListener("click", async() => {
    await clienteSms.enviar({ numero: '+541162349408', texto: 'Su pedido ha sido recibido y se encuentra en proceso.' })

    console.log('envío ok')
})