const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')

const Blog = require('./models/post.js')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

const postsRouter = require('./controllers/posts')
app.use('/api/blogs', postsRouter)


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
