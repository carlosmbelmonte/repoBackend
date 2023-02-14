import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url';//---> Solucion encontrada en Google

const __filename = fileURLToPath(import.meta.url);//---> Solucion encontrada en Google
const __dirname = path.dirname(__filename);//---> Solucion encontrada en Google

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
})

export default{
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    TESTMAIL: process.env.TESTMAIL,
    TESTMAILPASS: process.env.TESTMAILPASS
}