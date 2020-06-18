const ReviewStatus = require("../models/enums/review-status");
const UserStatus = require("../models/enums/user-status");
const UserRole = require("../models/enums/user-role");
const ApiResponse = require('./viewmodels/ApiResponse');

const path = require("path"),
    {
        Buyer,
        User,
        Product
    } = require(path.join(__dirname, "..", "models")),
    {
        cashbackService
    } = require(path.join(__dirname, "..", "services"));

//Follow Seller:
exports.followSeller = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then((buyer) => {
            buyer.follows.push({
                sellerId: req.params.id,
            });
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(
                new ApiResponse(200, "success", {
                    success: "follow seller saved to a particular buyer",
                })
            );
        })
        .catch((err) => {
            res.status(500).send(new ApiResponse(500, "error", err));
        });
};

exports.unfollowSeller = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then((buyer) => {
            buyer.follows = buyer.follows.filter((seller) => {
                return seller.sellerId != req.params.id;
            });
            return buyer.save();
        })
        .then(() => {
            res
                .status(200)
                .json(
                    new ApiResponse(200, "success", {
                        success: "follow seller deleted"
                    })
                );
        })
        .catch((err) => {
            res.status(500).send(new ApiResponse(500, "error", err));
        });
};

exports.getAvailableCashback = (req, res, next) => {
  cashbackService.getAvailableCashback(req.userId)
    .then(availableCashBack=>{  res.status(200).json(new ApiResponse(200, "success", { availableCashBack }))})
    .catch(next);
};

// Handle Approve Seller
exports.approveSeller = (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      user.status = UserStatus.ACTIVE;
      return user.save();
    })
    .then((user) => {
      res.status(200).json(new ApiResponse(200, "success", user));
    })
    .catch(next);
};

// Handle Reject Seller
exports.rejectSeller = (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      user.status = UserStatus.REJECT;
      return user.save();
    })
    .then((user) => {
      res.status(200).json(new ApiResponse(200, "success", user));
    })
    .catch(next);
};

// Handle Post Review
exports.postReview = (req, res, next) => {
  const productId = req.params.productid;
  const id = req.params.id;
  Product.findById(productId)
    .then((product) => {
      let review = product.reviews.find((review) => {
        return review._id.toString() === id;
      });

      review.status = ReviewStatus.POSTED;
      return product.save();
    })
    .then(() => {
      res.status(200).json(
        new ApiResponse(200, "success", {
          success: "product review posted",
        })
      );
    })
    .catch(next);
};

// Handle Reject Review
exports.rejectReview = (req, res, next) => {
  const productId = req.params.productid;
  const id = req.params.id;

  Product.findById(productId)
    .then((product) => {
      let review = product.reviews.filter((review) => {
        return review._id == id;
      })[0];

      review.status = ReviewStatus.REJECTED;
      return product.save();
    })
    .then(() => {
      res.status(200).json(
        new ApiResponse(200, "success", {
          success: "product review posted",
        })
      );
    })
    .catch(next);
};

exports.getPendingUsers = (req, res, next) => {
    User.find({$and : [{status: {$eq: UserStatus.PENDING}}, {role: {$eq: UserRole.SELLER}}]})
        .then((users) => {
                res.status(200).json(new ApiResponse(200, "success",  users));
        })
        .catch(next);
}

exports.getPendingReviews = (req, res, next) => {
    Product.find({"reviews.status": {$eq: ReviewStatus.PENDING}})
        .then((products) => {
            let reviews = [];
            products.map(p=>{
                p.reviews.forEach(review => {
                    let r = {};
                    r.productDetails = {};
                    r.productDetails.title = p.title;
                    r.productDetails.productId = p._id.toString();
                    r.review = review;
                    reviews.push(r);
                });
            });
            res.status(200).json(new ApiResponse(200, "success",  reviews.filter(r=>r.review.status === ReviewStatus.PENDING)));
        })
        .catch(next);
}