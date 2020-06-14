const
    path = require('path'),
    {ApiResponse, Buyer, Product, Order, UserStatus, OrderStatus, ReviewStatus} = require(path.join(__dirname, "..", "models")),
    {orderService} = require(path.join(__dirname, '..', 'services'));

exports.getAllAddresses = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then(buyer => {
            console.log('buyer', buyer);
            res.status(200).json(new ApiResponse(200, 'success', buyer.addresses));
        })
        .catch(err => res.status(500).send(new ApiResponse(500, 'error', err)));
}

exports.addAddress = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then(buyer => {
            buyer.addresses.push({
                zipCode: req.body.zipCode,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                phoneNumber: req.body.phoneNumber,
                country: req.body.country
            });
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, 'success', {success: 'address saved to a particular buyer'}));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

exports.deleteAddress = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then(buyer => {
            buyer.addresses = buyer.addresses.filter(address => {
                return address._id != req.params.id
            });
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, 'success', {success: 'address deleted'}));

        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        })
}

exports.getAddressDetail = async (req, res, next) => {
    try {
        const currentBuyer = await Buyer.findById(req.user._id);
        if (currentBuyer) {
            let addressDetail = currentBuyer.addresses.filter(address => {
                return address._id == req.params.id;
            })[0];
            res.status(200).send(new ApiResponse(200, 'success', addressDetail));
        } else {
            res.status(401).send(new ApiResponse(401, 'error', {err: 'buyer not exist'}));
        }
    } catch (err) {
        res.status(500).send(new ApiResponse(500, 'error', err));
    }
}

exports.editAddress = (req, res, next) => {
    Buyer.findByIdAndUpdate(req.user._id)
        .then(buyer => {
            let addressDetail = buyer.addresses.filter(address => {
                return address._id == req.params.id
            })[0];
            addressDetail.zipCode = req.body.zipCode;
            addressDetail.street = req.body.street;
            addressDetail.city = req.body.city;
            addressDetail.state = req.body.state;
            addressDetail.phoneNumber = req.body.phoneNumber;
            addressDetail.country = req.body.country;
            buyer.addresses.forEach(address => {
                if (address._id == req.params.id) {
                    address = addressDetail;
                }
            })
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, 'success', {success: 'address updated'}));
        })
        .catch(err => {
            res.status(500).json(new ApiResponse(500, 'error', err));
        });
}

//Billing Info:
exports.getAllBillingInfo = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then(buyer => {
            res.status(200).json(new ApiResponse(200, 'success', buyer.billingInfo));
        })
        .catch(err => res.status(500).send(new ApiResponse(500, 'error', err)));
}

exports.addBillingInfo = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then(buyer => {
            buyer.billingInfo.push({
                cardNumber: req.body.cardNumber,
                cardName: req.body.cardName,
                expirationDate: req.body.expirationDate,
                securityCode: req.body.securityCode,
                billingAddress: {
                    zipCode: req.body.zipCode,
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    phoneNumber: req.body.phoneNumber,
                    country: req.body.country
                }
            });
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, 'success', {success: 'billing info saved to a particular buyer'}));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

exports.deleteBillingInfo = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then(buyer => {
            buyer.billingInfo = buyer.billingInfo.filter(billingInfo => {
                return billingInfo._id != req.params.id
            });
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, 'success', {success: 'billingInfo deleted'}));

        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        })
}

exports.getBillingInfoDetail = async (req, res, next) => {
    try {
        const currentBuyer = await Buyer.findById(req.user._id);
        if (currentBuyer) {
            let billingInfoDetail = currentBuyer.billingInfo.filter(billingInfo => {
                return billingInfo._id == req.params.id;
            })[0];
            res.status(200).send(new ApiResponse(200, 'success', billingInfoDetail));
        } else {
            res.status(401).send(new ApiResponse(401, 'error', {err: 'buyer not exist'}));
        }
    } catch (err) {
        res.status(500).send(new ApiResponse(500, 'error', err));
    }
}

exports.editBillingInfo = (req, res, next) => {
    Buyer.findByIdAndUpdate(req.user._id)
        .then(buyer => {
            let billingInfoDetail = buyer.billingInfo.filter(billingInfo => {
                return billingInfo._id == req.params.id
            })[0];
            billingInfoDetail.cardNumber = req.body.cardNumber;
            billingInfoDetail.cardName = req.body.cardName;
            billingInfoDetail.expirationDate = req.body.expirationDate;
            billingInfoDetail.securityCode = req.body.securityCode;
            billingInfoDetail.billingAddress = {
                zipCode: req.body.zipCode,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                phoneNumber: req.body.phoneNumber,
                country: req.body.country
            };
            buyer.billingInfo.forEach(billingInfo => {
                if (billingInfo._id == req.params.id) {
                    billingInfo = billingInfoDetail;
                }
            })
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, 'success', {success: 'billingInfo updated'}));
        })
        .catch(err => {
            res.status(500).json(new ApiResponse(500, 'error', err));
        });
}

//Follow Seller:
exports.addFollowSeller = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then(buyer => {
            buyer.follows.push({
                sellerId: req.body.sellerId
            });
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, 'success', {success: 'follow seller saved to a particular buyer'}));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

exports.deleteFollowSeller = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then(buyer => {
            buyer.follows = buyer.follows.filter(seller => {
                return seller.sellerId != req.params.id;
            });
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, 'success', {success: 'follow seller deleted'}));

        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        })
}

//Buyer Reviews:
exports.addReview = (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => {
                if (order.status == OrderStatus.DELIVERED) {
                    Product.findById(req.params.productId)
                        .then(product => {
                            product.reviews.push({
                                status: ReviewStatus.PENDING,
                                buyerId: req.user._id,
                                createdDate: req.body.createdDate,
                                stars: req.body.stars,
                                comment: req.body.comment,
                                decisionDate: req.body.decisionDate
                            });
                            return product.save();
                        })
                        .then(() => {
                            res.status(200).json(new ApiResponse(200, 'success', {success: 'product reviews saved to a particular product and buyer'}));
                        })
                        .catch(err => {
                            res.status(500).send(new ApiResponse(500, 'error', err));
                        });
                }
            res.status(200).send(new ApiResponse(200, 'error', {error: "order status not delivered so you can't add review"}));
            }
        )
        .catch(err => { res.status(500).send(new ApiResponse(500, 'error', err)) });
}

exports.deleteReview = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            product.reviews = product.reviews.filter(review => {
                return review._id != req.params.reviewId;
            });
            return product.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, 'success', {success: 'review deleted'}));

        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        })
}

exports.getAllActiveReviewsByProductId = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            let reviews = product.reviews.filter(review => {
                    return review.status == UserStatus.ACTIVE;
                }
            )
            res.status(200).json(new ApiResponse(200, 'success', reviews));
        })
        .catch(err => res.status(500).send(new ApiResponse(500, 'error', err)));
}

exports.createOrder = (req, res)=>{
    request(req, res, orderService.createOrder(req.user._id, req.body));
}

exports.cancelOrder = (req, res)=>{
    request(req, res, orderService.cancelOrderByBuyer(req.userId, req.params.orderId));
}

exports.getMyOrders = (req, res)=>{
    request(req, res, orderService.getBuyerOrders(req.userId));
}
function request(req, res, promise){
    promise
        .then(response=>{
            res.status(response.status).json(response);
        })
        .catch(err=>{
            console.error(err);
            res.status(500).json(new ApiResponse(500, 'error', {
                message: err.message
                //, stack: err.stack
            }));
        });
}
