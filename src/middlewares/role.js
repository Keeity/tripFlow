
const User = require('../models/User');

function checkRole(roles) {
    return async function(req, res, next) {
    try{ 
        const id = req.payload.sub
        const user = await User.findByPk(id)
        if (user && roles.includes (user.role)) {
            next();
        } else {
            res.status(403).send('Acesso negado. Usuário sem permissão para acessar');
        };
}  catch (error) {
    console.error('Erro no middleware checkRole:', error);
    res.status(500).send('Erro permissão usuário - Erro interno do servidor');
}

}
}
module.exports = { checkRole };