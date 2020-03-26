const postsRouter = require("express").Router()
const Post = require("../models/post")
const User = require("../models/user")
const jwt = require('jsonwebtoken')



postsRouter.get("", async (request, response) => {
  const blogs = await Post.find({})
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

  const post = new Post({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author,
    user: user._id

  })

  const result = await post.save()
  user.posts = user.posts.concat(result.id)
  await user.save()

  response.json(result.toJSON())


})

postsRouter.delete('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  
  if ( post.user.toString() === decodedToken.id.toString() ) {
    const post = await Post.findOneAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'invalid authorization' })
  }

  

})

postsRouter.put('/:id', async (request, response) => {
  const post = request.body
  const result = await Post.findOneAndUpdate(request.params.id, post)
  response.json(post.toJSON())

})

module.exports = postsRouter
