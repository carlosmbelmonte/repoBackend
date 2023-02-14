import nodemailer from 'nodemailer'
import config from '../../seteo.js'

const sendmail = async(objeto) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: `${config.TESTMAIL}`,//Quien envia el mail
            pass: `${config.TESTMAILPASS}`//password genereda con GOOGLE
        }
    })

    try {
        await transporter.sendMail(objeto)
        console.log('OK')
    } catch (error) {
        console.log(error)
    }    
}

export default sendmail