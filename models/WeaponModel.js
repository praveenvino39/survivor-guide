const  {mongoose} = require('../db');
const Schema = require('mongoose').Schema

const WeaponSchema = Schema({
    category : { type: Schema.Types.ObjectId, ref: 'Weapon Category' },
    name: String,
    description: String,
    image: String,
    ammoType: String,
    hitDamage: Number,
    weapons: [{ type: Schema.Types.ObjectId, ref: 'Weapon' }],
    timeBetween: String,
    firingModes: [{type: String}],
    method:String,
    duration:String,
    recoil:String,
    magazineSize:Number,
    extended: Number,
    capacity: Number,
    attachment: Number,
    sounds: [{ type: Schema.Types.ObjectId, ref: 'Sound' }]
});
let WeaponModel = mongoose.model("Weapon", WeaponSchema);


module.exports = { WeaponModel }

