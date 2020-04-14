import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTH, ALL_AUTHORS } from '../queries'

const BirthForm = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [editAuthor] = useMutation(SET_BIRTH, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const submit = async (event) => {
        event.preventDefault()

        editAuthor({ variables: { name, setBornTo: Number(born) } })


        setName('')
        setBorn('')
    }

    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <div>
                    author
                    <select
                        value={name}
                        onChange={({ target }) => setName(target.value)}>
                        <option value=''>Select author</option>
                        {props.authors.map(author => (
                            <option value={author.name} key={author.id}>{author.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    born
              <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>

                <button type='submit'>update author</button>
            </form>
        </div>
    )
}
export default BirthForm