const buyer = require('../models/buyer');

exports.getAllAddresses = (req, res, next) => {
    buyer.findById(req.params.buyerId)
        .then(buyer => {
            res.status(200).json(new ApiResponse(200, 'success', buyer.address));
        })
    res.status(500).send(new ApiResponse(500, 'error', err));
}

exports.addAddress = (req, res, next) => {
    buyer.findById(req.params.buyerId)
        .then(buyer => {
            buyer.address.push({
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
    buyer.findById(req.params.buyerId)
        .then(buyer => {
            buyer.address.splice(req.params.index, 1);
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
        const currentBuyer = await buyer.findById(req.params.buyerId);
        if (currentBuyer) {
            res.status(200).send(new ApiResponse(200, 'success', currentBuyer.address[req.params.index]));
        } else {
            res.status(401).send(new ApiResponse(401, 'error', {err: 'buyer not exist'}));
        }
    } catch (err) {
        res.status(500).send(new ApiResponse(500, 'error', err));
    }
}

exports.editAddress = (req, res, next) => {
    buyer.findByIdAndUpdate(req.body.buyerId)
        .then(buyer => {
            buyer.address[req.body.index].zipCode = req.body.zipCode;
            buyer.address[req.body.index].street = req.body.street;
            buyer.address[req.body.index].city = req.body.city;
            buyer.address[req.body.index].state = req.body.state;
            buyer.address[req.body.index].phoneNumber = req.body.phoneNumber;
            buyer.address[req.body.index].country = req.body.country;
            return buyer.save();
        })
        .then(() => {
            res.status(200).json(new ApiResponse(200, 'success', {success: 'address updated'}));
        })
        .catch(err => {
            res.status(500).json(new ApiResponse(500, 'error', err));
        });
}


