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




app.use(bodyParse());

nunjucks.configure("public", {
    autoescape: true,
    express: app
});
app.use("/uploads",express.static("uploads"))






app.get('/',async (req, res) =>{
    const weaponCategory = await WeaponseCategoryModel.find()
    const weapons = await WeaponModel.find().populate("category")
    return res.render("index.html", {weaponCategory: weaponCategory, weapons: weapons})
});


app.use("/weapon", weaponController)


app.listen(process.env.PORT || 5000, () => {
    console.log("server is running")
});
