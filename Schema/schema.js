const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{type:String, uppercase:true},
        email:{type:String, required:true, unique:true},
        mobile:{type:Number},
        password:{type:String}
    },
    {collection:'register'}
)

module.exports = mongoose.model('userModel', userSchema)