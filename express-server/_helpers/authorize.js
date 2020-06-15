const ApiResponse = require('../controllers/viewmodels/ApiResponse');
const { verifyToken } = require('../routes/security');

module.exports = authorize;

function authorize(roles = []){
    if(typeof roles === 'string')
        roles = [roles];

    return [
        verifyToken,
        (req, res, next) => {
            if(roles.length && !roles.includes(req.user.role))
                return res.status(401).json(new ApiResponse(401, 'Unauthorized'));
    
            next();
        }
    ]
}