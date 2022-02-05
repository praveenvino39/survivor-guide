const mongoose = require("mongoose");
require('dotenv').config();


mongoose.connect("mongodb+srv://pv4you:"+process.env.ATLAS_PASSWORD+"@cluster0.i6pr8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connect to Database");
});
module.exports = {mongoose}

