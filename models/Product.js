const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    categoryID: { type: Schema.Types.ObjectId, ref: 'category' },
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    origin: { type: String },
    image: { type: String, default: 'none-avatar.png' },
    createDate: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('product', ProductSchema);

class Product extends ProductModel {

    static async createProduct(categoryID, name, price, origin, image) {
        const id = Math.round(Math.random() * 100);
        const product = await ProductModel.create({ id, categoryID, name, price, origin, image });
        if (!product)
            throw new Error('Cannot create product!');
        return product;
    }




}


module.exports = { Product, ProductModel }


