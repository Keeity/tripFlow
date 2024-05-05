const roles = {
    admin: 'admin',
    user: 'user',
    premiumUser: 'premiumUser'
};

const checkRole = (rolesPermitidos) => (req, res, next) => {
    if (rolesPermitidos.includes(req.user.role)) {
        next();
    } else {
        res.status(403).send('Acesso negado. Usuário sem permissões de acesso.');
    }
};

module.exports = {
    isAdmin: checkRole([roles.admin]),
    isUser: checkRole([roles.user]),
    isallUser: checkRole([roles.user, roles.premiumUser]),
    isPremiumUser: checkRole([roles.premiumUser]),
    isPremiumOrAdmin: checkRole([roles.admin, roles.premiumUser])
};