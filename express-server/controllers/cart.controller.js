const path = require("path"),
    {
        Buyer
    } = require(path.join(__dirname, "..", "models"));

const ApiResponse = require('./viewmodels/ApiResponse');

//MARK:- SHOPPING CART
//get list of shopping card
exports.getListShoppingCard = (req, res) => {
    Buyer.findById(req.user.id)
        .populate('shoppingCart.productId')
        .then((buyer) => {
            res.status(200).json(new ApiResponse(200, "success", buyer.shoppingCart));
        })
        .catch((err) => res.status(500).send(new ApiResponse(500, "error", err)));
};

//add to shopping card product
exports.addProductToShoppingCart = (req, res) => {
    const productId = req.body.productId;

    Buyer.findById(req.user._id)
        .then((buyer) => {
            let productExist= false;
            for(let i = 0; i< buyer.shoppingCart.length; i++){
                if(buyer.shoppingCart[i].productId.toString() === productId){
                    productExist = true;
                    buyer.shoppingCart[i].quantity++;
                    break;
                }
            }
            if(!productExist){
                buyer.shoppingCart.push({
                    productId: productId,
                    quantity: 1,
                });
            }
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(
                new ApiResponse(200, "success", {
                    success: "product added",
                })
            );
        })
        .catch((err) => {
            res.status(500).json(new ApiResponse(500, "error", err));
        });
};

//update product shopping cart
exports.updateProductFromShoppingCart = (req, res) => {
    const id = req.params.id;

    Buyer.findByIdAndUpdate(req.user._id)
        .then((buyer) => {
            let product = buyer.shoppingCart.find(
                (cart) => cart.productId.toString() === id
            );
            product.quantity = req.body.quantity;
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(
                new ApiResponse(200, "success", {
                    success: "product updated",
                })
            );
        })
        .catch((err) => {
            res.status(500).json(new ApiResponse(500, "error", err));
        });
};

//delete product from shopping card
exports.deleteProductFromShoppingCart = (req, res) => {
    const id = req.params.id;
    Buyer.findById(req.user._id)
        .then((buyer) => {
            buyer.shoppingCart = buyer.shoppingCart.filter(
                (product) => {
                    return product.productId.toString() !== id;

                }
            );

            return buyer.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, "success", {success: "product removed"}));
        })
        .catch((err) => {
            res.status(500).json(new ApiResponse(500, "error", err));
        });
};
