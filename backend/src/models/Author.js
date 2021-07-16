const mongoose = require('mongoose')

// Author has bio and name
const authorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    bio:{
        type: String
    }
})

bookSchema.virtual('book',{
    ref: 'Book',
    localField: '_id',
    foreignField: 'author'
})

const Author = mongoose.model('Author', authorSchema)
module.exports = Author
