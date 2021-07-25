const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

const authorHelper = require('./routers/authorHelper')
const categoryHelper = require('./routers/categoryHelper')
const bookHelper = require('./routers/bookHelper')
const adminHelper = require('./routers/adminHelper')

app.use(cors({
    origin: 'http://localhost:3001'
}))
app.use(authorHelper)
app.use(categoryHelper)
app.use(bookHelper)
app.use(adminHelper)

app.listen(port, () => {
    console.log('Server is up on port ', port);
})