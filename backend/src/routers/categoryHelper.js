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
router.patch('/category/:id', async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = [
        'name'
    ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const category = await Category.findOne({_id: req.params.id})
        if (!category) {
            return res.status(404).send()
        }
        updates.forEach((update) => category[update] = req.body[update])
        await category.save()
        res.send(category)
    } catch (error) {
       res.status(400).send(error) 
    }  
})

// Get a category
router.get('/category', async(req,res)=>{
    try {
        const categories = await Category.find({})
        res.send(categories)
    } catch (error) {
        res.status(500).send(error)
    }

})


// Get category by id
router.get('/category/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const category = await Category.findOne({_id})
        if (!category) {
            res.status(404).send('No category found')
        }
        res.send(category)
    } catch (error) {
        res.status(500).send()
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