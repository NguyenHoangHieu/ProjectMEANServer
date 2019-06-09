const express = require('express');
const router = express.Router();
const { Account } = require('../models/Account');
const authenticate = require('../lib/authenticate');

router.post('/create', (req, res) => {
    const { email, password, name } = req.body;
    Account.createAccount(email, password, name)
        .then(data => {
            res.send({
                code: 1,
                data: { data },
                message: 'Success'
            })
        })
        .catch(err => {
            res.send({
                code: 0,
                data: null,
                message: err.message
            })
        })
})

router.post('/update', (req, res) => {
    const { email, name, password, newPassword }= req.body;
    //console.log(req.body);
    Account.updateAccount(email, name, password, newPassword)
        .then(data => {
            res.send({
                code: 1,
                data: { data },
                message: 'Success'
            })
        })
        .catch(err => {
            res.send({
                code: 0,
                data: null,
                message: err.message
            })
        })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    Account.signInAccount(email, password)
        .then(data => {
            res.send({
                code: 1,
                data: data,
                message: 'Success'
            })
        })
        .catch(err => {
            res.send({
                code: 0,
                data: null,
                message: err.message
            })
        })
})

router.post('/check', authenticate,(req,res)=>{
    const _id = req.userId;
    Account.findAccount(_id)
    .then(data=>{
      
        res.send({ 
            code: 1,
            data: data,
            message: 'Success'
        })
    })
    .catch(err=>{
        res.send({ 
            code: 0,
            data: null,
            message: err.message
        })
    })
})

module.exports = router;
