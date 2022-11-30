import twilio from 'twilio'
import dotenv from 'dotenv';
dotenv.config()

const twilioClient = twilio(process.env.ACCTSID, process.env.AUTHTOKEN)
const from = '+19457581814'
const to = '+541162349408'
const body = 'Su pedido ha sido recibido y se encuentra en proceso.'


const smsTwilio = async() =>{
    const info = await twilioClient.messages.create({ body, from, to })  
    console.log(info.dateUpdated)  
} 

export default {
    smsTwilio
}



