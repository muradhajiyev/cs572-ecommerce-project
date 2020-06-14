const path = require('path'),
    jwt = require('jsonwebtoken'),
    config = require(path.join(__dirname, '..','config.json')),
    bcryptjs = require('bcryptjs'),
    { ApiResponse, User, Buyer, Seller  } = require(path.join(__dirname, "..", "models"));

exports.login = async function(email, password){
    
    const user = await User.findOne({ email });
    if (!user) return new ApiResponse(401, "error", { message: "Username doesn't exists" });

    const pwdPass = bcryptjs.compareSync(password, user.password);
    if (!pwdPass) return new ApiResponse(403, "error", { message: "Invalid password" })

    const token = jwt.sign({ userId: user._id.toString() }, config.SECRET_KEY, { expiresIn: config.EXPIRES_IN });
    let result = {
        "access_token": token
       };
    return new ApiResponse(200, "success", result); 
}

exports.signup = async function(userType, data) {
    if (await User.findOne({ email: data.email })) return new ApiResponse(401, "error", { message: "Email is already registered" });
    let user;
    switch(userType){
        case 'buyer':
            user = await createUser(data, 'ACTIVE', 'BUYER');
            let buyer = new Buyer({_id:user._id,shoppingCart:[],addresses:[],billingInfo:[],follows:[],cashBack:[]});
            buyer.save();
            break;
        case 'seller':
            user = await createUser(data, 'PENDING', 'SELLER');
            let seller = new Seller({_id:user._id,products:[]});
            seller.save();
            break;
        default:
            return new ApiResponse(401, 'error', {message:'Unknown user type'});
    }
    return new ApiResponse(200, "success", {});
}
function createUser(data, status, userType){
    const hashedPassword = bcryptjs.hashSync(data.password, bcryptjs.genSaltSync(5));
    const user = new User({
        email: data.email,
        password: hashedPassword,
        name: data.name,
        status: status,
        userType: userType
    });
    return user.save();
}
