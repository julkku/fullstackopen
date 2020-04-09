import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../../reducers/blogReducer'
import CommentForm from './CommentForm'
import { Button } from '../styles'
import styled from 'styled-components'

const BlogDiv = styled.div`
  margin-top: 10px;
  width: 500px;
  padding: 10px;
  border: solid;
  border-width: 1px;
  background-color: #CC7E85;
  
`


const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (!blog) return ''




  const handleDelete = async (blog) => {
    if (!window.confirm(`Do you really want to delete ${blog.title}`)) return
    dispatch(deleteBlog(blog))
  }

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const blogInfo = (
    <div>
      <a href={blog.url}><Button>visit</Button></a> <br />
      {blog.likes} likes <Button className='like-button' onClick={() => handleLike(blog)}>like</Button> <br />
      {blog.user.name}
      <CommentForm blog = {blog} />
      <b>Comments:</b>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>

    </div>
  )




  return (
    <BlogDiv className='blog'>
      <b>{blog.title}</b> {blog.author} {' '}
      {user.username === blog.user.username &&
        <Button className='delete-button'
          onClick={() => handleDelete(blog)}>delete</Button>}
      {blogInfo}
    </BlogDiv>)
}

export default Blog
