import jwt from 'jsonwebtoken'

const verifyTokenCliente= (req, res, next) => {
    const token = req.header('auth-token')

    jwt.verify(token, 'CLIENTE', function(err, decoded) {
        if (err) {
            console.log(`${err.name} + ${err.message}`)
            return res.status(403).json({ message: 'Token de CLIENTE expiro'}) 
        }else{
            console.log(decoded)
            next()
        }
    })
}

const verifyTokenAdmin= (req, res, next) => {
    const token = req.header('auth-token')

    jwt.verify(token, 'ADMIN', function(err, decoded) {
        if (err) {
            if(err.name == 'JsonWebTokenError'){
                return res.status(403).json({ message: 'Solo ADMIN puede realizar esta accion'})     
            }
            if(err.name == 'TokenExpiredError'){
                return res.status(403).json({ message: 'Token de ADMIN expiro'})     
            }
            
        }else{
            console.log(decoded)
            next()
        }
    })
}

export { verifyTokenAdmin, verifyTokenCliente }