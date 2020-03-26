const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Post = require('../models/post')
const User = require('../models/user')

const helper = require('./test_helper')
const bcrypt = require('bcrypt')




beforeEach(async () => {
  jest.setTimeout(10000)
  await User.deleteMany({})
  await Post.deleteMany({})

  await Post.insertMany(helper.initialPosts)


})

describe('pre-existing blog posts', () => {

  test('are returned as json', async () => {

    await api
      .get('/api/posts')
      .expect(200)

  })

  test('post id is defined as "id"', async () => {
    const response = await api.get('/api/posts')
    expect(response.body[0].id).toBeDefined()

  })

  test('are all returned', async () => {
    const response = await api.get('/api/posts')
    expect(response.body.length).toBe(helper.initialPosts.length)
  })
})

describe('addition of a new blog post', () => {
  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

  })

  test('succeeds if blog is valid', async () => {

    const credentials = { username: "root", password: "sekret" }
    const login = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)

    const token = login.body.token

    const newPost = {
      title: 'This is the real thing',
      author: 'You',
      url: "localhost",
      likes: 100
    }

    await api
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(newPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd.length).toBe(helper.initialPosts.length + 1)

    const contents = postsAtEnd.map(n => n.title)

    expect(postsAtEnd.length).toBe(helper.initialPosts.length + 1)
    expect(contents).toContain('This is the real thing')

  })

  test('that has likes set as undefined returnes post with 0 likes', async () => {
    const newPost = {
      title: 'This is the real thing',
      author: 'You',
      url: "localhost",
    }

    const credentials = { username: "root", password: "sekret" }
    const login = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)

    const token = login.body.token

    await api
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(newPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd[postsAtEnd.length - 1].likes).toBe(0)
  })

  test('without title and url returns 400 Bad request', async () => {
    const newPost = {
      author: 'UNDAFINED',
    }

    const credentials = { username: "root", password: "sekret" }
    const login = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)

    const token = login.body.token

    await api
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(newPost)
      .expect(400)
  })
})

describe('removing a post', () => {
  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const passwordHash2 = await bcrypt.hash('sekret', 10)
    const user2 = new User({ username: 'hoot', passwordHash })
    await user2.save()
    await user.save()
    await Post.deleteMany({})

    const credentials = { username: "root", password: "sekret" }
    const login = await api
      .post('/api/login')
      .send(credentials)

    const token = login.body.token

    const postToBeDeleted = {
      title: 'This is the real thing',
      author: 'You',
      url: "localhost",
      likes: 100
    }

    await api
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(postToBeDeleted)


  })
  test('succeeds if user is same that created post', async () => {
    const credentials = { username: "root", password: "sekret" }
    const login = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)

    const token = login.body.token

    const posts = await helper.postsInDb()

    await api
      .delete(`/api/posts/${posts[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd.length).toBe(0)

  })

  test('fails if different user tries to delete it', async () => {

    const credentials = { username: "hoot", password: "sekret" }
    const login = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)

    const token = login.body.token

    const posts = await helper.postsInDb()

    await api
      .delete(`/api/posts/${posts[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd.length).toBe(1)

  })
})


afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500))
  await User.deleteMany({})
  await Post.deleteMany({})
  mongoose.connection.close()
})