const jwt = require('jsonwebtoken'),
    path = require('path'),
    config = require(path.join(__dirname, '..','config.json')),
    { ApiResponse } = require(path.join(__dirname, '..', 'models')),
    { userService } = require(path.join(__dirname, '..', 'services'));

exports.verifyToken = (req, res, next) => {
    const token = req.header('access-token');
    try {
        if (!token) {
            res.status(401).json(new ApiResponse(401, "error", { message: "Unauthorized User" }));
        }
        const verified = jwt.verify(token, config.SECRET_KEY);
        userService.getUserById(verified.userId)
            .then(user => {
                req.user = user;
                return next();
            })
            .catch(err => res.status(500).json(new ApiResponse(500, "error", err)));
    } catch (err) {
        res.status(401).json(new ApiResponse(401, "error", err));
    }
}

exports.authorizeAdmin = (req, res, next) => {
    if (req.user.userType !== 'ADMIN') {
        res.status(401).json(new ApiResponse(401, "error", { message: "Unauthorized ADMIN" }));
    }
    return next();
}
exports.authorizeSeller = (req, res, next) => {
    if (req.user.userType !== 'SELLER') {
        res.status(401).json(new ApiResponse(401, "error", { message: "Unauthorized SELLER" }));
    }
    return next();
}
exports.authorizeBuyer = (req, res, next) => {
    if (req.user.userType !== 'BUYER') {
        res.status(401).json(new ApiResponse(401, "error", { message: "Unauthorized BUYER" }));
    }
    return next();
}