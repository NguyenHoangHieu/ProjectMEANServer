require('./lib/connectDB');

const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();
app.use(bodyParser);

const cors = require('cors');
//const authenticate = require('./lib/authenticate');
const accountRouter = require('./controllers/account.route');
const categoryRouter = require('./controllers/category.route');
const productRouter = require('./controllers/product.route');

app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Expose-Headers',['token']);
    next();
});

app.use('/account', accountRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

app.listen(3000, () => {
    console.log('Server started!');
})
