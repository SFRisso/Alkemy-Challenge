const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ');
        const user = jwt.verify(token[1], 'secret');
        if (token[0] === 'Bearer' && user) {
            next()
        }
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            res.status(401).json(e);
        } else if (e.name === 'TypeError' && e.message === `Cannot read properties of undefined (reading 'split')`) {
            res.status(400).json({ error: 'Debe proveer un token de Authorization en la cabecera. Ejemplo Bearer token' });
        } else if (e.name === 'TokenExpiredError' && e.message === `jwt expired`) {
            const expirado = e.expiredAt;
            res.status(400).json({
                error: 'token expirado',
                expirado
            });
        } else {
            res.status(400).json(e);
        }
    }
}

module.exports = {
    checkToken: checkToken
}