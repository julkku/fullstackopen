import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentOnBlog } from '../../reducers/blogReducer'
import { Button, Input } from '../styles'


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
        <Input
          type="text"
          value={comment}
          name="comment"
          id="comment"
          onChange={({ target }) => setComment(target.value)}>

        </Input>
      </div>
      <Button id="login-submit" type="submit">add comment</Button>
    </form >
  )
}
export default CommentForm