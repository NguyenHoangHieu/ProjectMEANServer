const { signJWT, verifyJWT } = require('./jwt')

function authenticate(req, res, next) {

    const { token } = req.headers;
    if (!token)
        return res.send({
            code: 0,
            data: null,
            message: 'Can not find token!'
        })

    verifyJWT(token)
        .then(obj => {
            req.userId = obj._id
            next()
        })
        .catch(err => {
            res.send({
                code: 0,
                data: null,
                message: err.message
            })
        })
}

module.exports = authenticate;