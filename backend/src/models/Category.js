const mongoose = require('mongoose')

// Categories have only name stored

const categorySchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
})



const Category = mongoose.model('Category', categorySchema)
module.exports = Category