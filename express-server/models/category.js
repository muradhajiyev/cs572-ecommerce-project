const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({

})

//collection name => categorys
module.exports = mongoose.model('Category', categorySchema);