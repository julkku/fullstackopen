import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('')
  const [books, setBooks] = useState(null)
  const [getBooks, { loading, data }] = useLazyQuery(BOOKS_BY_GENRE)
  const genreResult = useQuery(ALL_GENRES)


  useEffect(() => {
    async function fetch() {

      await getBooks({ variables: { genre: genreFilter } })
      if (data && data.allBooks) {
        setBooks(data.allBooks)
      }
    }
    fetch()

  }, [data, genreFilter, getBooks])



  if (!props.show || !books) {
    return null
  }


  if (loading || genreResult.loading) {
    return <div>loading ...</div>
  }

  const genres = genreResult.data.allGenres


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre => (
        <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenreFilter('')}>All genres</button>
    </div>
  )
}



export default Books