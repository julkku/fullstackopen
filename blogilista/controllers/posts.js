const postsRouter = require("express").Router()
const Post = require("../models/post")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

postsRouter.get("", async (request, response) => {
  const blogs = await Post.find({})
    .populate('user', { username: 1, name: 1})
  response.json(blogs)

});

postsRouter.post("", async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
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
  const post = await Post.findOneAndDelete(request.params.id)
  response.status(204).end()

})

postsRouter.put('/:id', async (request, response) => {
  const post = request.body
  const result = await Post.findOneAndUpdate(request.params.id, post)
  response.json(post.toJSON())

})

module.exports = postsRouter
