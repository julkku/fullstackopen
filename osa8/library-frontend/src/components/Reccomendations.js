import React from 'react'
import { useQuery } from '@apollo/client'
import { FAVORITE_GENRE } from '../queries'
const Reccomendations = (props) => {

    const favGenre = useQuery(FAVORITE_GENRE)

    if (favGenre.loading) {
        return <div>loading ...</div>
    }
    if (!props.show) {
        return null
    }
    const books = favGenre.data.booksByFavoriteGenre
    return (<div>
        <h2>recommendations</h2>
        <p>books in your favorite genre</p>

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
    </div>)
}
export default Reccomendations