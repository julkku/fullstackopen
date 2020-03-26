const postsRouter = require("express").Router()
const Post = require("../models/post")

postsRouter.get("", async (request, response) => {
  const blogs = await Post.find({})
  response.json(blogs)

});

postsRouter.post("", async (request, response) => {
  const blog = new Post(request.body)

  const result = await blog.save()

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
    return
  }
  
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
