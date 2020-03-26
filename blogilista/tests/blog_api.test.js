const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Post = require('../models/post')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Post.deleteMany({})
  await Post.insertMany(helper.initialPosts)
})


test('posts are returned as json', async () => {
  await api
    .get('/api/posts')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('post id is defined as "id"', async () => {
  const response = await api.get('/api/posts')
  expect(response.body[0].id).toBeDefined()

})

test('all posts are returned', async () => {
  const response = await api.get('/api/posts')
  expect(response.body.length).toBe(helper.initialPosts.length)
})

test('a valid post can be added', async () => {
  const newPost = {
    title: 'This is the real thing',
    author: 'You',
    url: "localhost",
    likes: 100
  }

  await api
    .post('/api/posts')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const postsAtEnd = await helper.postsInDb()
  expect(postsAtEnd.length).toBe(helper.initialPosts.length + 1)

  const contents = postsAtEnd.map(n => n.title)

  expect(postsAtEnd.length).toBe(helper.initialPosts.length + 1)
  expect(contents).toContain('This is the real thing')

})

test('new post with undefined likes is created with 0 likes', async () => {
  const newPost = {
    title: 'This is the real thing',
    author: 'You',
    url: "localhost",
  }

  await api
    .post('/api/posts')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const postsAtEnd = await helper.postsInDb()
  expect(postsAtEnd[postsAtEnd.length - 1].likes).toBe(0)
})

test('new post without title and url returns 400 Bad request', async () => {
  const newPost = {
    author: 'UNDAFINED',
  }

  await api 
    .post('/api/posts')
    .send(newPost)
    .expect(400)
})


afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500))
  mongoose.connection.close()
})