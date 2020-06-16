const { Category } = require('../models');

exports.getCategories = function(){
    return Category.find();;
}
