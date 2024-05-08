
const User = require('../models/User');
// const roles = {
//     admin: 'admin',
//     user: 'user',
//     premiumUser: 'premiumUser'
// };
// const checkRole = (rolesPermitidos) => (req, res, next) => {
//     if (rolesPermitidos.includes(req.user.role)) {
//         next();
//     } else {
//         res.status(403).send('Acesso negado. Usuário sem permissões de acesso.');
//     }
// };

// module.exports = {
//     isAdmin: checkRole([roles.admin]),
//     isUser: checkRole([roles.user]),
//     isallUser: checkRole([roles.user, roles.premiumUser]),
//     isPremiumUser: checkRole([roles.premiumUser]),
//     isPremiumOrAdmin: checkRole([roles.admin, roles.premiumUser])
// };

function checkRole(role) {
    return async function(req, res, next) {
    try{ 
        const id = req.payload.sub
        const user = await User.findByPk(id)
        if (user && user.role === role) {
            next();
        } else {
            res.status(403).send('Acesso negado. Usuário sem permissão para acessar');
        };
}  catch (error) {
    console.error('Erro no middleware checkRole:', error);
    res.status(500).send('Erro interno do servidor');
}

}
}
module.exports = { checkRole };