import config from '../seteo.js'

export default{
    mongodb: {
        cnxStr: `mongodb+srv://${config.USER}:${config.PASSWORD}@cluster0.zxvolg7.mongodb.net/${config.DATABASE}?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }
}