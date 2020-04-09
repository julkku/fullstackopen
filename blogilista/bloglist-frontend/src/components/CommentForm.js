import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentOnBlog } from '../reducers/blogReducer'
const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentOnBlog(blog, comment))
    setComment('')
  }

  const formStyle = {
    display: 'flex'
  }

  return (
    <form style={formStyle} onSubmit={handleComment}>
      <div>
        <input
          type="text"
          value={comment}
          name="comment"
          id="comment"
          onChange={({ target }) => setComment(target.value)}>

        </input>
      </div>
      <button id="login-submit" type="submit">add comment</button>
    </form >
  )
}
export default CommentForm