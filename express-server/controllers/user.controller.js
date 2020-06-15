const path = require("path"),
    {
        ApiResponse,
        Buyer,
        User
    } = require(path.join(__dirname, "..", "models")),
    {
        orderService
    } = require(path.join(__dirname, "..", "services"));

//Follow Seller:
exports.followSeller = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then((buyer) => {
            buyer.follows.push({
                sellerId: req.body.sellerId,
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

exports.getAvailableCashBack = (req, res) => {
    request(req, res, orderService.getAvailableCashBack(req.userId));
};


function request(req, res, promise) {
    promise
        .then((response) => {
            res.status(response.status).json(response);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(
                new ApiResponse(500, "error", {
                    message: err.message,
                    //, stack: err.stack
                })
            );
        });
}


// Handle Approve Seller
exports.approveSeller = (req, res, next) => {
    const id = req.params.id;

    User.findById(id)
        .then((user) => {
            user.status = "Active";
            res.send(user);
        })
        .catch((err) => {
            res.status(404).send({
                message: "user not found"
            });
        });
};

// Handle Reject Seller
exports.rejectSeller = (req, res, next) => {
    const id = req.params.id;

    User.findById(id)
        .then((user) => {
            user.status = "Reject";
            res.send(user);
        })
        .catch((err) => {
            res.status(404).send({
                message: "user not found"
            });
        });
};