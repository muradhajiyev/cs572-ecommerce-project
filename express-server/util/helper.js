const 
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "models"));
    
exports.catchError = function(err){
    return new ApiResponse(403, 'error', {message:err.message});
}