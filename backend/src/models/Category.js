const mongoose = require('mongoose')

// Categories have only name stored

const categorySchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

// categorySchema.virtual('book',{
//     ref: 'Book',
//     localField: '_id',
//     foreignField: 'categories'
// })

const Category = mongoose.model('Category', categorySchema)
module.exports = Category