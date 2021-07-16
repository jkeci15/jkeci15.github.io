const express = require('express')
const Category = require('../models/Category')

const router = new express.Router()

// Create category
// Update category
// Get a category


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