const  {mongoose} = require('../db');
const Schema = require('mongoose').Schema

const UserSchema = Schema({
    name:String,
    birthday: Date,
    phone_number: Number
});
let UserModel = mongoose.model("User", UserSchema);


module.exports = {UserModel}

