const bcrypt = require('bcrypt')

function hashPassword(password) {//mã hóa
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 6, (err, hash) => {
            if (err) return reject(err)
            return resolve(hash)
        })
    })
}

function comparePassword(password, hashPassword) {//so sánh
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, (err, result) => {
            if (err) return reject(err + " 123")
            if (!result) return reject(new Error('Password invalid!'))
            return resolve(result)
        })
    })
}

module.exports = { hashPassword, comparePassword }