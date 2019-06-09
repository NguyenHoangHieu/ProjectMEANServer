const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DBProductMEAN',{
    useNewUrlParser: true,
    useCreateIndex:true
}).then(()=>{
    console.log('Database connected!');
});