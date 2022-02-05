const router = require('express').Router()
const mongoose = require('mongoose')
const { WeaponseCategoryModel } = require('../models/WeaponCategoryModel')
const { WeaponModel } = require('../models/WeaponModel')
const upload = require('../middlewares/upload')
const fs = require('fs')
const path = require('path')







router.get("/", async (req, res) => {
    const weapons = await WeaponModel.find().populate("category", "-__v -weapons")
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





router.post("/create", async (req, res) => {
    const weapon = WeaponModel(req.body)
    weapon.image = req.file.path
    weapon.save()
    res.redirect('http://localhost:3000/');
})



router.post("/category/create", async (req, res) => {
    await WeaponseCategoryModel(req.body).save()
    const categories = await WeaponseCategoryModel.find()
    res.status(201).json(categories)
})




module.exports = router