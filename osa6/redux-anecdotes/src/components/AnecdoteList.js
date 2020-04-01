import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const vote = (id) => {

        dispatch(addVote(id))
        const content = anecdotes.filter(anecdote => anecdote.id === id)[0]
        console.log(content)
        dispatch(setNotification(`voted for '${content.content}'`))
        setTimeout(() => {dispatch(resetNotification())}, 5000)

    }
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList