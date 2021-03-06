const mongoose = require('mongoose')
// Book has id, name, description, and image.
// It has one author and many categories
const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    description:{
        type: String,
        trim: true
    },

    bookCover:{
        type: Buffer
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    categories:[
        {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }]
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book