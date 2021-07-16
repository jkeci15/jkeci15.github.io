const mongoose = require('mongoose')

// Categories have only name stored

const categorySchema = mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true
    }
})

bookSchema.virtual('book',{
    ref: 'Book',
    localField: '_id',
    foreignField: 'categories'
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category