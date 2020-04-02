import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.newAnecdote]
    case 'ADD_VOTE':
      const id = action.updated.id
      console.log(action.updated)
      
      return state.map(a => a.id !== id ? a : action.updated)
    case 'INIT_ANECDOTES':
      return action.anecdotes
    default:
      return state
  }
}
export const addVote = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.updateAnecdote(
      {
        ...anecdote,
        votes: anecdote.votes + 1
      })
    dispatch({
      type: 'ADD_VOTE',
      updated,
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      newAnecdote,
    })
  }
}

export default reducer