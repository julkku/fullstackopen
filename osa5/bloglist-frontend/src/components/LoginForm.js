import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const LoginForm = ({ user, setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
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
                'loggedNoteappUser', JSON.stringify(user)
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
        window.localStorage.removeItem('loggedNoteappUser')
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
                        onChange={({ target }) => setUsername(target.value)}
                    ></input>
                </div>
                <div>
                    password
          <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form >
        </div>
    )



    return (
        <div>
            <Notification message={message} />

            {!user && loginForm}
            {user && (
                <p>Logged in as {user.name} <button onClick={() => handleLogout()}>logout</button></p>
            )}
        </div>
    )
}


export default LoginForm