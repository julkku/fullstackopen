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

module.exports = postsRouter
