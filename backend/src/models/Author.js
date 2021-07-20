const mongoose = require('mongoose')

// Author has bio and name
const authorSchema = mongoose.Schema({
    authorName:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    bio:{
        type: String
    }
})

// authorSchema.virtual('book',{
//     ref: 'Book',
//     localField: '_id',
//     foreignField: 'author'
// })

const Author = mongoose.model('Author', authorSchema)
module.exports = Author
