
const
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "models")),
    { authService } = require(path.join(__dirname, '..', 'services'));

exports.login = (req, res, next) => {
    authService.login(req.body.email, req.body.password)
        .then(response => {
            res.status(response.status).json(response);
        }).catch(err => {
            res.status(500).json(new ApiResponse(500, 'error', { message: err.message }));
        });
}


exports.signup = (req, res, next) => {
    authService.signup(req.params.role, req.body)
        .then(response => {
            res.status(response.status).json(response);
        })
        .catch(err => {
            res.status(500).json(new ApiResponse(500, 'error', { message: err.message }));
        });
}