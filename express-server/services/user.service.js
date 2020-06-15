const path = require('path'),
    { ObjectId } = require('mongodb'),
    { User } = require(path.join(__dirname,'..', 'models'));

exports.getUserById = async function(userId){
    return await User.findById({ _id: new ObjectId(userId) });
}