const jwt = require('jsonwebtoken');
const secretKey = `temp01`;
async function isAuthenticated(req, res, next) {
    try {
        const authToken = req.get('Authorization');
        const token = authToken.split(' ')[1];
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function isAuthorized(req, res, next) {
    try {
        const authToken = req.get('Authorization');
        const token = authToken.split(' ');
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);
        next();
    } catch (err) {
        console.log(err);
        nenxt(err);
    }
}




module.exports = {
    isAuthenticated,
    isAuthorized,
}