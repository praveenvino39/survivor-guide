const  {mongoose} = require('../db');
const Schema = require('mongoose').Schema

const SoundSchema = Schema({
    name: String,
    type: String,
    sound: String,
});
let SoundModel = mongoose.model("Sound", SoundSchema);


module.exports = {SoundModel}

