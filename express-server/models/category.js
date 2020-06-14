const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {type: String},
})

//collection name => categories
module.exports = mongoose.model('Category', categorySchema, "categories");