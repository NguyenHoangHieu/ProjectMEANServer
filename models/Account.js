const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashPassword, comparePassword } = require('../lib/bcrypt');
const { signJWT, verifyJWT } = require('../lib/jwt');

const AccountSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String }
});

const AccountModel = mongoose.model('account', AccountSchema);

class Account extends AccountModel {

    static async createAccount(email, password, name) {

        const checkUser = await AccountModel.findOne({ email });
        if (checkUser)
            throw new Error('Email existed!');

        const newHashPassword = await hashPassword(password)
            .catch(err => {
                throw new Error('Please try again!')
            });

        const user = await AccountModel.create({ email, password: newHashPassword, name });
        if (!user)
            throw new Error('Cannot create user!');

        return {
            _id: user._id,
            email: user.email,
            name: user.name
        }
    }

    static async updateAccount(email, name, password, newPassword) {
        const checkUser = await AccountModel.findOne({ email });
        if (!checkUser)
            throw new Error('Email existed!');

        const checkPassword = await comparePassword(password, checkUser.password)
        if (!checkPassword)
            throw new Error('Password not existed!');

        const newHashPassword = await hashPassword(newPassword)
            .catch(err => {
                throw new Error('Please try again!');
            });

        const user = await AccountModel.findOneAndUpdate(
            { email: checkUser.email },
            {
                $set: {
                    password: newHashPassword,
                    name
                }
            },
            { new: true }
        );
        if (!user)
            throw new Error('Cannot update user!');
        console.log(user);
        return {
            _id: user._id,
            email: user.email,
            name: user.name
        }
    }

    static async signInAccount(email, password) {
        const user = await AccountModel.findOne({ email });
        if (!user) throw new Error('Can not find user');

        const checkPassword = await comparePassword(password, user.password)
            .catch(err => { throw new Error(err.message) });

        if (checkPassword) {
            const token = await signJWT({ _id: user._id })
                .catch(err => { throw new Error(err.message) });

            const userInfo = user.toObject();
            delete userInfo.password;
            userInfo.token = token;
            return userInfo;
        }
    }

    static async findAccount(_id) {
        const user = await AccountModel.findById(_id)
        if (!user) throw new Error('Can not find user!')
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
        };
    }

}


module.exports = { Account, AccountModel }

