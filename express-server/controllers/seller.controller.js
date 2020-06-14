const { Product, ApiResponse } = require('../models');
const { productService } = require('../services');
 
exports.getProduct = function(req, res, next){
    // productService.getProduct(req.params.id)
    //     .then((product) => res.status(200).json(new ApiResponse(200, 'The product was found succesfully.', product)))
    //     .catch(next);
}

exports.createProduct = function(req, res, next){
    const product = productService.createProduct(req.body.title, req.body.categoryId, req.body.price, req.body.imageName, req.body.description, req.user.id);
    res.status(200).json(new ApiResponse(200, 'The product was created succesfully.', product));
}

exports.editProduct = function(req, res, next){
    productService.editProduct(req.params.id, req.body.title, req.body.categoryId, req.body.price, req.body.description)
        .then((product) => res.status(200).json(new ApiResponse(200, 'The product was updated succesfully.', product)))
        .catch((next));
}