const router = require('express').Router()
const mongoose = require('mongoose')
const { WeaponseCategoryModel } = require('../models/WeaponCategoryModel')
const { WeaponModel } = require('../models/WeaponModel')
const upload = require('../middlewares/upload')
const fs = require('fs')
const path = require('path')
const { SoundModel } = require('../models/SoundSchema')








router.get("/", async (req, res) => {
    const weapons = await WeaponModel.find().populate("category","-__v -weapons").populate("sounds","-__v")
    res.status(200).json(weapons)
})




router.get("/category", async (req, res) => {
    const categories = await WeaponseCategoryModel.find()
    res.status(201).json(categories)
})


router.get("/category/:id", async (req, res) => {
    const categories = await WeaponModel.find({ category: req.params.id }).populate("category", "-weapons -__v").exec()
    res.status(200).json(categories)
})





router.post("/create", upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'single', maxCount: 1},
    {name: 'auto', maxCount: 1},
    {name: 'burst', maxCount: 1},
    {name: 'suppressor', maxCount: 1},
    {name: 'reload', maxCount: 1},
]), async (req, res) => {
    const weapon = WeaponModel(req.body)
    weapon.image = req.files["image"][0].path

    //Single sound upload if there is
    if(req.files["single"]){
        const soundModel = SoundModel({
            name: "Single",
            type: "Shoot",
            sound: req.files["single"][0].path
        })
        soundModel.save()
        weapon.sounds.push(soundModel)
    }

    //Auto sound upload if there is
    if(req.files["auto"]){
        const soundModel = SoundModel({
            name: "Auto",
            type: "Shoot",
            sound: req.files["auto"][0].path
        })
        soundModel.save()
        weapon.sounds.push(soundModel)
    }

    //Burst sound upload if there is
    if(req.files["burst"]){
        const soundModel = SoundModel({
            name: "Burst",
            type: "Shoot",
            sound: req.files["burst"][0].path
        })
        soundModel.save()
        weapon.sounds.push(soundModel)
    }

    //Supperssor sound upload if there is
    if(req.files["suppressor"]){
        const soundModel = SoundModel({
            name: "Suppressor",
            type: "Shoot",
            sound: req.files["suppressor"][0].path
        })
        soundModel.save()
        weapon.sounds.push(soundModel)
    }

    //Reload sound upload if there is
    if(req.files["reload"]){
        const soundModel = SoundModel({
            name: "Reload",
            type: "Mechanics",
            sound: req.files["reload"][0].path
        })
        soundModel.save()
        weapon.sounds.push(soundModel)
    }

    console.log("Sounds created")
    weapon.save()
    res.redirect('');
})


router.post("/category/create", async (req, res) => {
    await WeaponseCategoryModel(req.body).save()
    const categories = await WeaponseCategoryModel.find()
    res.status(201).json(categories)
})




module.exports = router