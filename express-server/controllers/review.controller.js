const path = require("path");
const ApiResponse = require("./viewmodels/ApiResponse");
const {
    Product,
    ReviewStatus,
} = require(path.join(__dirname, "..", "models"));
const {
    reviewService
} = require(path.join(__dirname, "..", "services"));

//Buyer Reviews:
exports.addReview = (req, res, next) => {
    let newReview = {
        status: ReviewStatus.PENDING,
        buyer:{
            buyerId: req.user._id,
            name: req.user.name,
            email: req.user.email
        },
        createdDate: new Date(),
        stars: req.body.stars,
        comment: req.body.comment,
        decisionDate: null
    }
    reviewService.getOrdersByBuyerIdMatchWithProductIdDelivered(req.user._id, req.params.productId)
        .then((orders) => {
            if (orders.length > 0) {
                reviewService.getProductByUserId(req.user._id, req.params.productId)
                    .then(product => {
                        if (product.length > 0) {
                            reviewService.removeReview(req.user._id, req.params.productId)
                                .then(result => {
                                    addReview(req.user._id, req.params.productId, newReview, res);
                                })
                                .catch(err => res.status(500).json(new ApiResponse(500, 'error', {message: "can't replace the existing review"})));
                        } else {
                            addReview(req.user._id, req.params.productId, newReview, res);
                        }
                    })
                    .catch(err => next(new Error("can't find product with this id and this buyer id")));
            } else {
                res.status(200).json(new ApiResponse(200, "success", {message: "You can't add review until your order is delivered"}));
            }
        }).catch(err => next(err));
};


// not-good should be refactored. You are filtered here, you should use filtered db query.
exports.getProductReviewByUserId = (req, res, next) => {
    reviewService.getProductByUserId(req.user._id, req.params.productId)
        .then(product => {
            if (product.length > 0) {
                let review = product[0].reviews.find(review => {
                    return review.buyer.buyerId.toString() === req.user._id.toString();
                })
                res.status(200).json(new ApiResponse(200, "success", review));
            }
        })
        .catch((err) => {
            res.status(500).send(new ApiResponse(500, "error", err))
        });
};

exports.deleteReview = (req, res, next) => {
    reviewService.removeReview(req.user._id, req.params.productId)
        .then(() => {
            res.status(200).json(new ApiResponse(200, "success", {success: "review deleted"}))
        })
        .catch((err) => {
            res.status(500).send(new ApiResponse(500, "error", {error: err}))
        });
};

exports.getAllActiveReviewsByProductId = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      let reviews = product.reviews.filter((review) => {
        return review.status === ReviewStatus.POSTED;
      });
      res.status(200).json(new ApiResponse(200, "success", reviews));
    })
    .catch((err) => res.status(500).send(new ApiResponse(500, "error", err)));
};

addReview = (userId, productId, newReview, res) => {
    reviewService.pushReview(userId, productId, newReview)
        .then(result => {
            res.status(200).json(new ApiResponse(200, "success", {success: 'Review added'}));
        })
        .catch(err => res.status(500).json(new ApiResponse(500, 'error', {error: "can't add review"})));
}
