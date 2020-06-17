const { Product } = require('../models');
const PagedDto = require('./dto/Paged.dto');

exports.getProducts = async function(pageNumber = 1, pageSize = 10){
    const products = await Product.find()
        .skip((pageSize * pageNumber) - pageSize)
        .limit(parseInt(pageSize));
        
    const numOfProducts = await Product.countDocuments();

    return new PagedDto(products, pageNumber, Math.ceil(numOfProducts / pageSize), numOfProducts);
}

exports.getProduct = async function(productId){
    const product = await Product.findById(productId);
    if(!product) throw Error(`The product with id: ${productId} was not found in the system.`);
    return product;
}

exports.createProduct  = function(title, categoryId, price, imageName, description, sellerId){
    const product = new Product({
        title: title,
        categoryId: categoryId,
        price: price,
        imageName: imageName,
        description: description,
        sellerId: sellerId
    });

    if(!product.save())
        throw Error("The product couldn't be created. Check the system log for a detailed information.");

    return product;
}

exports.editProduct = async function(productId, title, categoryId, price, description){
    const product = await Product.findById(productId);
    if(!product) throw Error(`The product with id: ${productId} was not found in the system.`);
    product.title = title;
    product.categoryId = categoryId;
    product.price = price;
    product.description = description;
    product.save();

    if(!product) throw Error("The product couldn't be updated. Check the system log for a detailed information.");

    return product;
}

exports.deleteProduct = function(id){
    //Todo: it is needed to be implemented after product id is added to orders.
}