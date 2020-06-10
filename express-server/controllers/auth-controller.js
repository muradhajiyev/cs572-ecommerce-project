
const
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "models")),
    { authService } = require(path.join(__dirname, '..', 'services'));

exports.login = async (req, res, next) => {
    try {
        let response = await authService.login(req.body.email, req.body.password);
        res.status(response.status).json(response);
    } catch (err) {
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}


exports.signup = (req, res, next) => {
    try {
        authService.signup(req.params.userType, req.body).then(response=>{
            res.status(response.status).json(response);
        });
    } catch (err) {
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}