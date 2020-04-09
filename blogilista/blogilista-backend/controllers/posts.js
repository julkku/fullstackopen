const postsRouter = require("express").Router()
const Blog = require("../models/post")
const User = require("../models/user")
const jwt = require('jsonwebtoken')



postsRouter.get("", async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)

});

postsRouter.post("", async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const post = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author,
    user: user._id

  })

  const result = await post.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()

  response.json(result.toJSON())


})

postsRouter.delete('/:id', async (request, response) => {
  const post = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  
  if ( post.user.toString() === decodedToken.id.toString() ) {
    const post = await Blog.findOneAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'invalid authorization' })
  }

  

})

postsRouter.put('/:id', async (request, response) => {
  const post = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, post, { new: true })
  response.json(updatedBlog.toJSON())
  
})

postsRouter.post('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
  blog.comments.push(request.body.content)
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new : true})
  response.json(updatedBlog.toJSON())

})

module.exports = postsRouter
