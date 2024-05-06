const { verify } = require('jsonwebtoken')
const { secret } = require('../config/database.config')  //ali embaixo, ao invés de "process.env.SECRET_JWT", usa apenas secret

async function auth(req, res, next){ 
try {
console.log("Início do middleware")
const { authorization } = req.headers

req['payload'] = verify(authorization, secret) 

next() 
} catch(error){
return res.status(401).send({message: "Autenticação falhou", 
cause: error.message
})

}
}



//daí, se quiser exigir autenticação em alguma rota, é só colocar o middleware entre req res da rota.  req, auth, res
module.exports = { auth }