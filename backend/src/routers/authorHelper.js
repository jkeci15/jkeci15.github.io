const express = require('express')
const Author = require('../models/Author')
const router = new express.Router()

// Get authors
router.get('/authors', async (req,res)=>{
    try {
        const authors = await Author.find({})
        res.send(authors)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Get an author
router.get('/authors/:id', async (req,res)=>{
    try {
        const author = await Author.findOne({_id: req.params.id})
        if(!author){
            res.status(404).send()
        }
        res.send(author)
    } catch (error) {
        res.status(500).send()
    }
})

// Create author
router.post('/authors', async (req,res)=>{
    const author = new Author(req.body)
    try {
        await author.save()
        res.status(201).send(author)
    } catch (error) {
        res.status(400).send()
    }
})

// // Update author
// router.patch('/authors', async(req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates = [
//         'name',
//         'bio'
//     ]
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates' })
//     }

//     try {
//         const author = await Author.findOne({_id: req.params.id})
//         if (!author) {
//             return res.status(404).send()
//         }
//         updates.forEach((update) => author[update] = req.body[update])
//         await author.save()
//         res.send(author)
//     } catch (error) {
//        res.status(400).send(error) 
//     }  
// })

// // Delete an author
// router.delete('/authors/:id', async(req,res)=>{
//  try {
//         const author = await Author.findOneAndDelete({_id: req.params.id})
//         if (!author) {
//             return res.status(404).send()
//         }
//         res.send()
//     } catch (error) {
//         res.status(500).send()
//     }
// })

module.exports = router