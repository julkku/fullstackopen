
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import {
  useSubscription, useApolloClient
} from '@apollo/client'
import Reccomendations from './components/Reccomendations'
import { BOOK_ADDED, BOOKS_BY_GENRE } from './queries'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if (token) {
      setPage('books')
    }
  }, [token])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)
    
    const dataInStore = client.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: '' } })    
    if (!includedIn(dataInStore.allBooks, addedBook)) {      
      client.writeQuery({
        query: BOOKS_BY_GENRE, variables: { genre: '' },
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }


  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

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
        {token && <span>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendations')}>recommendations</button>
        </span>}
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