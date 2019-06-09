const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    id: { type: Number, required: true, unique: true},
    name: { type: String, required: true},
    description: { type: String }
});

const CategoryModel = mongoose.model('category', CategorySchema);

class Category extends CategoryModel{
    
    static async CreateCategory(name, description){
        const id = Math.round(Math.random() * 100);
        const category = await CategoryModel.create({ id, name, description });
        if(!category) 
            throw new Error(' Cannot create category!');
       return category;
    }

}

module.exports = { Category, CategoryModel }
