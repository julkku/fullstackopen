describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Julius',
      username: 'jules',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log into application')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('jules')
      cy.get('#password').type('salainen')
      cy.get('#login-submit').click()
      cy.contains('Logged in as Julius')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('arnold')
      cy.get('#password').type('swartzengngd')
      cy.get('#login-submit').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'jules', password: 'salainen' })

    })

    it('A blog can be created', function () {
      cy.get('#newblog').click()
      cy.get('#title').type('test blog please ignore')
      cy.get('#author').type('marx')
      cy.get('#url').type('localhost')
      cy.get('#post-create').click()

      cy.contains('Created blog: test blog please ignore')
      cy.contains('test blog please ignore marx')
    })

  })

  describe('When logged in with pre-existing blog', function () {
    beforeEach(function () {
      cy.login({ username: 'jules', password: 'salainen' })
      cy.get('#newblog').click()
      cy.get('#title').type('test blog please ignore')
      cy.get('#author').type('marx')
      cy.get('#url').type('localhost')
      cy.get('#post-create').click()

    })

    it('a blog can be liked', function () {
      cy.get('.blog:first').click()
      cy.get('.like-button:first').click()
      cy.get('.blog:first').click()

      cy.contains('1')
    })
    it('the same user can delete the blog', function () {
      cy.get('.delete-button:first').click()

      cy.get('.blog').should('not.exist')
    })

  })

  describe('With one user and many blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'jules', password: 'salainen' })
      cy.createBlog({ title: 'one', author: 'marx', url: 'localhost' })
      cy.createBlog({ title: 'two', author: 'hegel', url: 'localhost' })
      cy.createBlog({ title: 'three', author: 'plato', url: 'localhost' })
      cy.createBlog({ title: 'four', author: 'ur mom', url: 'localhost' })

    })

    it('a blog can be liked', function () {
      cy.get('.blog:last').click()
      cy.get('.like-button:last').click()
      cy.get('.blog:last').click()
      cy.get('.like-button:last').click()
      cy.get('.blog').contains('two').click()
      cy.get('.blog').contains('localhost').contains('like').click()
      cy.get('.blog:last').click()
      cy.get('.like-button:last').click()
      cy.get('.blog').contains('three').click()
      cy.get('.blog').contains('localhost').contains('like').click()

      cy.get('.blog').then(blogs => {
        console.log(blogs[0])
        cy.wrap(blogs[0]).contains('ur mom')
        cy.wrap(blogs[1]).contains('hegel')
        cy.wrap(blogs[2]).contains('plato')
        cy.wrap(blogs[3]).contains('marx')
      })

    })

  })

})
