import twilio from 'twilio'

const accountSid = 'AC9384929f3d7f5d8a52b325dc2824a452'
const authToken = 'c44c7938e42b4f0b273868ab11497db5'

const client = twilio(accountSid, authToken)

const numero = '+5491162349408'
const mensaje = 'Nuevo pedido de...'

const wspTwilio = async() => {
    const message = await client.messages.create({
        body: mensaje,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${numero}`
    })
    console.log(message.dateUpdated)    
}

export default {
    wspTwilio
}