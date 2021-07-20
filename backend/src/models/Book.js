const mongoose = require('mongoose')
// Book has id, name, description, and image.
// It has one author and many categories
const bookSchema = mongoose.Schema({
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
        type: Buffer,
        // contentType: String
    },
    author:{
        type: String,
        trim: true  
    },
    categories:{
        type: String,
        trim: true  
      },
    // author:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Author'
    // },

    // categories:[
    //     {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Category'
    // }]
})


const Book = mongoose.model('Book', bookSchema)
module.exports = Book