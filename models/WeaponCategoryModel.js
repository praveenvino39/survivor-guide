const  {mongoose} = require('../db');
const Schema = require('mongoose').Schema

const WeaponCategorySchema = Schema({
    type: String,
    weapons: [{ type: Schema.Types.ObjectId, ref: 'Weapon' }]
});
let WeaponseCategoryModel = mongoose.model("Weapon Category", WeaponCategorySchema);


module.exports = {WeaponseCategoryModel}

