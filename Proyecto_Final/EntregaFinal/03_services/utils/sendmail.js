import nodemailer from 'nodemailer'

const sendmail = async(objeto) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: `${process.env.TESTMAIL}`,//Quien envia el mail
            pass: `${process.env.TESTMAILPASS}`//password genereda con GOOGLE
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