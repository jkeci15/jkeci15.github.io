const express = require('express')
require('./db/mongoose')

const authorHelper = require('./routers/authorHelper')
const categoryHelper = require('./routers/categoryHelper')
const bookHelper = require('./routers/bookHelper')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(authorHelper)
app.use(categoryHelper)
app.use(bookHelper)

app.listen(port, () => {
    console.log('Server is up on port ', port);
})