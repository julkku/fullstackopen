const postsRouter = require("express").Router()
const Blog = require("../models/post")

postsRouter.get("", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

});

postsRouter.post("", async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result.toJSON())
  
})

module.exports = postsRouter
