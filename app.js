const express = require("express");
const bodyParse = require('body-parser')
const { WeaponseCategoryModel } = require('./models/WeaponCategoryModel');
const { WeaponModel } = require('./models/WeaponModel');
const app = express();
const mongoose = require('./db');
const  nunjucks = require('nunjucks');
const { log } = require("console");
const { Schema } = require("mongoose");
const weaponController = require('./routers/weaponController')
const http = require('http')




app.use(bodyParse());

nunjucks.configure("public", {
    autoescape: true,
    express: app
});
app.use("/uploads",express.static("uploads"))






app.get('/',async (req, res) =>{
    const weaponCategory = await WeaponseCategoryModel.find()
    const weapons = await WeaponModel.find().populate("category")
    return res.render("index.html", {weaponCategory: weaponCategory, weapons: weapons, hostname:  req.headers.host})
});


app.use("/weapon", weaponController)


app.listen(process.env.PORT || 1000, () => {
    setInterval(()=>{
          http.request("http://still-springs-73303.herokuapp.com", function(res) {
            res.on('data', function (chunk) {
              console.log('BODY: ' + chunk);
            });
          }).end();
    },5000)
    console.log("server is running")
});
