const path = require('path');
const ApiResponse = require('../controllers/viewmodels/ApiResponse');
    
exports.catchError = function(err){
    return new ApiResponse(403, 'error', {message:err.message});
}