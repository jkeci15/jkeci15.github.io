const express = require('express')
const Book = require('../models/Book.js')
const router = new express.Router()

// Get all books
router.get('/', async (req,res)=>{
    try {
        const books = await Book.find({})
        res.send(books)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Get book by id
router.get('books/:id', async (req,res)=>{
    try {
        const book = await Book.findOne(req.params.id)
        if (!book) {
            res.status(404).send('No book found')
        }
        res.send(book)
    } catch (error) {
        res.status(500).send()
    }
})

// Create a book
router.post('/books', async (req,res)=>{
    const book = new Book(req.body)
    try {
        await book.save()
        res.status(201).send(book)
    } catch (error) {
        res.status(400).send()
    }
})

// Update a book
router.patch('/books', async (req,res)=>{
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