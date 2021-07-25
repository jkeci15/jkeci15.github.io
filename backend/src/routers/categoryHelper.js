const express = require('express')
const Category = require('../models/Category')

const router = new express.Router()

// Create category
router.post('/category', async (req,res)=>{
    const category = new Category(req.body)
    try{
        await category.save()
        res.status(201).send()
    }
    catch(error){
        res.status(400).send()
    }
})
// Update category
// Get a category
router.get('/category', async(req,res)=>{
    try {
        const categories = await Category.find({})
        res.send(categories)
    } catch (error) {
        res.status(500).send(error)
    }

})

// Delete category
router.delete('/category/:id', async(req,res)=>{
 try {
        const category = await Category.findOneAndDelete({_id: req.params.id})
        if (!category) {
            return res.status(404).send()
        }
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
module.exports = router