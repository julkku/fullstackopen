import React, { useState } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)



  return (
    <div>
      <Notification message={message} />

      <LoginForm setUser={setUser} user={user} setMessage={setMessage} />
      {user && <Blogs user={user} setMessage={setMessage}/>}
    </div>
  )
}

export default App