const path = require("path"),
  { ApiResponse, Buyer } = require(path.join(__dirname, "..", "models"));

exports.getAllAddresses = (req, res, next) => {
  Buyer.findById(req.user._id)
    .then((buyer) => {
      res.status(200).json(new ApiResponse(200, "success", buyer.addresses));
    })
    .catch((err) => res.status(500).send(new ApiResponse(500, "error", err)));
};

exports.addAddress = (req, res, next) => {
  Buyer.findById(req.user._id)
    .then((buyer) => {
      buyer.addresses.push({
        zipCode: req.body.zipCode,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
      });
      return buyer.save();
    })
    .then(() => {
      res.status(200).json(
        new ApiResponse(200, "success", {
          success: "address saved to a particular user",
        })
      );
    })
    .catch((err) => {
      res.status(500).send(new ApiResponse(500, "error", err));
    });
};

exports.deleteAddress = (req, res, next) => {
  Buyer.findById(req.user._id)
    .then((buyer) => {
      buyer.addresses = buyer.addresses.filter((address) => {
        return address._id != req.params.id;
      });
      return buyer.save();
    })
    .then(() => {
      res
        .status(200)
        .json(new ApiResponse(200, "success", { success: "address deleted" }));
    })
    .catch((err) => {
      res.status(500).send(new ApiResponse(500, "error", err));
    });
};

exports.getAddressDetail = async (req, res, next) => {
  try {
    const currentBuyer = await Buyer.findById(req.user._id);
    if (currentBuyer) {
      let addressDetail = currentBuyer.addresses.filter((address) => {
        return address._id == req.params.id;
      })[0];
      res.status(200).send(new ApiResponse(200, "success", addressDetail));
    } else {
      res
        .status(401)
        .send(new ApiResponse(401, "error", { err: "buyer not exist" }));
    }
  } catch (err) {
    res.status(500).send(new ApiResponse(500, "error", err));
  }
};

exports.editAddress = (req, res, next) => {
  Buyer.findByIdAndUpdate(req.user._id)
    .then((buyer) => {
      let addressDetail = buyer.addresses.filter((address) => {
        return address._id == req.params.id;
      })[0];
      addressDetail.zipCode = req.body.zipCode;
      addressDetail.street = req.body.street;
      addressDetail.city = req.body.city;
      addressDetail.state = req.body.state;
      addressDetail.phoneNumber = req.body.phoneNumber;
      addressDetail.country = req.body.country;
      buyer.addresses.forEach((address) => {
        if (address._id == req.params.id) {
          address = addressDetail;
        }
      });
      return buyer.save();
    })
    .then(() => {
      res
        .status(200)
        .json(new ApiResponse(200, "success", { success: "address updated" }));
    })
    .catch((err) => {
      res.status(500).json(new ApiResponse(500, "error", err));
    });
};

//get list of shopping card
exports.getListShoppingCard = (res, res, next) => {
  Buyer.findById(req.user.id)
    .then((buyer) => {
      res.status(200).json(new ApiResponse(200, "success", buyer.shoppingCart));
    })
    .catch((err) => res.status(500).send(new ApiResponse(500, "error", err)));
};

//add to shopping card product
exports.addProductToShoppingCart = (res, res, next) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  Buyer.findById(req.user._id)
    .then((buyer) => {
      buyer.shoppingCart.push({
        productId: productId,
        quantity: quantity,
      });

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
exports.updateProductFromShoppingCart = (res, res, next) => {
  const productId = req.params.id;

  Buyer.findByIdAndUpdate(req.user._id)
    .then((buyer) => {
      let product = buyer.shoppingCart.filter((product) => {
        return product._id == productId;
      })[0];
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
exports.deleteProductFromShoppingCart = (res, res, next) => {
  const productId = req.params.id;
  Buyer.findById(req.user._id)
    .then((buyer) => {
      buyer.shoppingCart = buyer.shoppingCart((product) => {
        return product._id != productId;
      });

      return buyer.save();
    })
    .then(() => {
      res.status(200).json(
        new ApiResponse(200, "success", {
          success: "product removed",
        })
      );
    })
    .catch((err) => {
      res.status(500).json(new ApiResponse(500, "error", err));
    });
};
