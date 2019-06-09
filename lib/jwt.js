const jwt = require('jsonwebtoken')
//const jwtBlacklist = require('jwt-blacklist')(jwt);
const SECRET_KEY = 'chuoibaomat1234567890'

function signJWT(obj) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign(obj, SECRET_KEY, { expiresIn: '1 days' })
        if (!token) return reject(new Error('Can not sign token!'));
        return resolve(token);
    })
}

function verifyJWT(token) {
    return new Promise((resolve, reject) => {
        const obj = jwt.verify(token, SECRET_KEY);
        if (!obj) return reject(new Error('Can not verify token!'));
        delete obj.exp;
        delete obj.iat;
        return resolve(obj);
    })
}

function blacklist(token) {
    return new Promise((resolve, reject) => {
        // const check = jwtBlacklist.blacklist(token)
        // return check == true ? resolve(check) : reject(new Error('Can not blacklist token!'))
        //not using jwtBlacklist
        return true;
    })
}
module.exports = { signJWT, verifyJWT }