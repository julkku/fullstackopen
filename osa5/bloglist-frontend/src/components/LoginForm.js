import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ user, setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {

      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Logged in successfully as ${user.username}`)
      setTimeout(() => { setMessage(null) }, 5000)

    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => { setMessage(null) }, 5000)

    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage('Logged out successfully')
    setTimeout(() => { setMessage(null) }, 5000)
  }


  const loginForm = (
    <div>
      <h2>Log into application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-submit" type="submit">login</button>
      </form >
    </div>
  )



  return (
    <div>

      {!user && loginForm}
      {user && (
        <p>Logged in as {user.name} <button onClick={() => handleLogout()}>logout</button></p>
      )}
    </div>
  )
}


export default LoginForm