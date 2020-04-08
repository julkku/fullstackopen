const Post = require('../models/post')
const User = require('../models/user')

const initialPosts = [
    {
      title: 'I am a dumdum',
      author: 'Richard Nurnberg',
      url: "localhost",
      likes: 50
    },
    {
      title: 'Test me for I have sinned',
      author: 'Jesus',
      url: "localhost",
      likes: 1
    }
  ]
  

  const nonExistingId = async () => {
    const post = new Post({ title: 'willremovethissoon' })
    await post.save()
    await post.remove()
  
    return post.id.toString()
  }
  

  const postsInDb = async () => {
    const posts = await Post.find({})
    return posts.map(post => post.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
  
module.exports = {
    initialPosts, nonExistingId, postsInDb, usersInDb
  }