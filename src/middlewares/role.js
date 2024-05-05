function checkRole(role) {
    return function(req, res, next) {
        const user = req.user; // Supondo que você tenha o usuário no request
        if (user.role === role) {
            next();
        } else {
            res.status(403).send('Acesso negado');
        }
    };
}

module.exports = { checkRole };