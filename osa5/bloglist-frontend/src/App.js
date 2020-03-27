import React, { useState } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)
  



  return (
    <div>
      <LoginForm setUser={setUser} user = {user} />
      {user && <Blogs />}



    </div>
  )
}

export default App