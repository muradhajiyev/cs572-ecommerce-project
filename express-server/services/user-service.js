const path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "models")),
    { ObjectId } = require('mongodb'),
    { User } = require(path.join('..', 'models'));

exports.getUserById = async function(userId){
    return await User.findById({ _id: new ObjectId(userId) });
}