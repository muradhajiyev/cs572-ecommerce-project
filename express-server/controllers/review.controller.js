const path = require("path");
const {
    ApiResponse,
    Product,
    Order,
    UserStatus,
    OrderStatus,
    ReviewStatus,
} = require(path.join(__dirname, "..", "models"));

//Buyer Reviews:
exports.addReview = (req, res, next) => {
    Order.findById(req.params.orderId)
        .then((order) => {
            if (order.status == OrderStatus.DELIVERED) {
                Product.findById(req.params.productId)
                    .then((product) => {
                        product.reviews.push({
                            status: ReviewStatus.PENDING,
                            buyerId: req.user._id,
                            createdDate: req.body.createdDate,
                            stars: req.body.stars,
                            comment: req.body.comment,
                            decisionDate: req.body.decisionDate,
                        });
                        return product.save();
                    })
                    .then(() => {
                        res.status(200).json(
                            new ApiResponse(200, "success", {
                                success: "product reviews saved to a particular product and buyer",
                            })
                        );
                    })
                    .catch((err) => {
                        res.status(500).send(new ApiResponse(500, "error", err));
                    });
            }
            res.status(200).send(
                new ApiResponse(200, "error", {
                    error: "order status not delivered so you can't add review",
                })
            );
        })
        .catch((err) => {
            res.status(500).send(new ApiResponse(500, "error", err));
        });
};

exports.deleteReview = (req, res, next) => {
    Product.findById(req.params.productId)
        .then((product) => {
            product.reviews = product.reviews.filter((review) => {
                return review._id != req.params.reviewId;
            });
            return product.save();
        })
        .then(() => {
            res
                .status(200)
                .json(new ApiResponse(200, "success", {
                    success: "review deleted"
                }));
        })
        .catch((err) => {
            res.status(500).send(new ApiResponse(500, "error", err));
        });
};

exports.getAllActiveReviewsByProductId = (req, res, next) => {
    Product.findById(req.params.productId)
        .then((product) => {
            let reviews = product.reviews.filter((review) => {
                return review.status == UserStatus.ACTIVE;
            });
            res.status(200).json(new ApiResponse(200, "success", reviews));
        })
        .catch((err) => res.status(500).send(new ApiResponse(500, "error", err)));
};