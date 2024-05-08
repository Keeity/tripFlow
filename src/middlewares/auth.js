const { verify } = require('jsonwebtoken')
const { secret } = require('../config/database.config')  //ali embaixo, ao invés de "process.env.SECRET_JWT", usa apenas secret

async function auth(req, res, next){ 
try {
console.log("Início do middleware auth")
const { authorization } = req.headers
console.log(authorization)
req['payload'] = verify(authorization, secret) 

if (authorization) {
    next()
}else {
    return res.status(401).send({error: "Autenticação falhou", cause: error.message})
}

}  catch (error) {
    console.error('Erro no middleware auth:', error);
    res.status(500).send('Erro interno do servidor');
    }

}


module.exports = { auth }