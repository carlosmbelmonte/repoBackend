import twilio from 'twilio'

const acctSid = 'AC9384929f3d7f5d8a52b325dc2824a452'
const authToken = 'c44c7938e42b4f0b273868ab11497db5'

const twilioClient = twilio(acctSid, authToken)
const from = '+19457581814'
const to = '+541162349408'
const body = 'Su pedido ha sido recibido y se encuentra en proceso.'


const infoTwilio = async() =>{
    const info = await twilioClient.messages.create({ body, from, to })  
    console.log(info)  
} 

export default {
    infoTwilio
}



