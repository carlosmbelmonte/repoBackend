import * as dotenv from 'dotenv'
dotenv.config()

export default{
    mongodb: {
        cnxStr: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zxvolg7.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }
}