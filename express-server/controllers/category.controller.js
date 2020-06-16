const ApiResponse = require('./viewmodels/ApiResponse');
const { categoryService } = require('../services');
 

exports.getCategories = function(req, res, next){
    console.log("hey");
    
    categoryService.getCategories()
        .then((categories) => res.status(200).json(new ApiResponse(200, 'The categories were found succesfully.', categories)))
        .catch(next);
}
