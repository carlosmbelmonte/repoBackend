import SmsSender from '../../../contenedores/TwilioSmsSender.js'

const credenciales = {
    numero: '+19457581814',
    usuario: 'AC9384929f3d7f5d8a52b325dc2824a452',
    contrasenia: '416694db9fc0e47363865048a6abd6d2'
}

export const clienteSms = new SmsSender(credenciales)