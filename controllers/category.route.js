const express = require('express');
const router = express.Router();
const { Category } = require('../models/Category');

router.post('/create', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    Category.CreateCategory(name, description)
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
module.exports = router;