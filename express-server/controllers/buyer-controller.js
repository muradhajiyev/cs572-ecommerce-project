const
    path = require('path'),
    { ApiResponse, Buyer } = require(path.join(__dirname, "..", "models"));

exports.getAllAddresses = (req, res, next) => {
    Buyer.findById(req.user._id)
        .then(buyer => {
            console.log(buyer);
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
            res.status(200).json(new ApiResponse(200, 'success', {success: 'address saved to a particular user'}));
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
                if(address._id == req.params.id){
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


