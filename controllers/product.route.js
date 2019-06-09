const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');

const authenticate = require('../lib/authenticate');
router.use(authenticate);

router.post('/create', (req, res) => {
    const { categoryID, name, price, origin, image } = req.body;
    Product.createProduct(categoryID, name, price, origin, image)
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
