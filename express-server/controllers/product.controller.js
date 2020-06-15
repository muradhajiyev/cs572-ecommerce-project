const ApiResponse = require('./viewmodels/ApiResponse');
const { productService } = require('../services');
 

exports.getProducts = function(req, res, next){
    productService.getProducts(req.query.pageNumber, req.query.pageSize)
        .then((pagedDto) => res.status(200).json(new ApiResponse(200, 'The products were found succesfully.', pagedDto)))
        .catch(next);
}

exports.getProduct = function(req, res, next){
    productService.getProduct(req.params.id)
        .then((product) => res.status(200).json(new ApiResponse(200, 'The product was found succesfully.', product)))
        .catch(next);
}

exports.createProduct = function(req, res, next){
    const product = productService.createProduct(req.body.title, req.body.categoryId, req.body.price, req.body.imageName, req.body.description, req.user.id);
    res.status(200).json(new ApiResponse(200, 'The product was created succesfully.', product));
}

exports.editProduct = function(req, res, next){
    productService.editProduct(req.params.id, req.body.title, req.body.categoryId, req.body.price, req.body.description)
        .then((product) => res.status(200).json(new ApiResponse(200, 'The product was updated succesfully.', product)))
        .catch(next);
}

exports.deleteProduct = function(req, res, next){
    //Todo: it is needed to be implemented after product id is added to orders.
}