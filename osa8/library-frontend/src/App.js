
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Reccomendations from './components/Reccomendations'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if (token) {
      setPage('books')
    }
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <div>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendations')}>recommendations</button>
          </div>}
        {!token ?
          <button onClick={() => setPage('login')}>login</button> :
          <button onClick={() => logout()}>logout</button>}


      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      {token && (
        <div>
          <NewBook
            show={page === 'add'}
          />

          <Reccomendations
            show={page === 'recommendations'}
          /></div>
      )}

      {!token &&
        (<LoginForm
          show={page === 'login'} setToken={setToken}
        />)}

    </div>
  )
}

export default App