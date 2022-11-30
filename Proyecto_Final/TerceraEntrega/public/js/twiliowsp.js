import twilio from 'twilio'
import dotenv from 'dotenv';
dotenv.config()

const client = twilio(process.env.ACCTSID, process.env.AUTHTOKEN)

const numero = '+5491162349408'
const mensaje = 'Nuevo pedido de...'

const wspTwilio = async(contenidoCarrito) => {
    const message = await client.messages.create({
        body: contenidoCarrito,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${numero}`
    })
    console.log(message.dateUpdated)    
}

export default {
    wspTwilio
}