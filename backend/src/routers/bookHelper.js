const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Book = require('../models/Book')
const Category = require('../models/Category')
const router = new express.Router()

// Get all books
router.get('/books', async (req,res)=>{
    try {
        const books = await Book.find({})
        res.send(books)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Get book by id
router.get('/books/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const book = await Book.findOne({_id})
        if (!book) {
            res.status(404).send('No book found')
        }
        res.send(book)
    } catch (error) {
        res.status(500).send()
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload jpg, png or jpeg files'))
        }
        cb(undefined, true)
    }
})
// Add image to book
router.post('/books/:id/cover', upload.single('upload'), async (req,res)=>{
    const book = await Book.findOne({_id: req.params.id})
    const buffer = await sharp(req.file.buffer).resize({width:100, height:100}).png().toBuffer()
    book.bookCover = buffer
    await book.save()
    res.send()
},(error, req, res, next) =>{
    res.status(400).send({error: error.message})
})

// Create a book
router.post('/books', async (req,res)=>{
    const book = new Book(req.body)
    try {
        const buffer = await sharp(req.body.bookCover).resize({width:100, height:100}).png()
        book.bookCover = buffer
        await book.save()
        req.body.categories.forEach(async (category) => {
            await Category.findAndUpdate({_id: category.id}, {$push: {books: req.body.id}})
        });
        res.status(201).send(book)
    } catch (error) {
        res.status(400).send()
    }
},(error, req, res, next) =>{
    res.status(400).send({error: error.message})})

// Update a book
router.patch('/books/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = [
        'name',
        'description',
        'image',
        'author',
        'categories'
    ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }
    try {
        const book = await Book.findOne({_id: req.params.id})
        if (!book) {
            return res.status(404).send()
        }
        updates.forEach((update) => book[update] = req.body[update])
        await book.save()

        res.send(book)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Delete a book
router.delete('/books/:id', async(req,res)=>{
    try {
        const book = await Book.findOneAndDelete({_id: req.params.id})
        if (!book) {
            return res.status(404).send()
        }
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router