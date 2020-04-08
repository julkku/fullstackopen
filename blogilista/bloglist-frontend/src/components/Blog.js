import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (!blog) return ''

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    width: '500px',
  }


  const handleDelete = async (blog) => {
    if (!window.confirm(`Do you really want to delete ${blog.title}`)) return
    dispatch(deleteBlog(blog))
  }

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const blogInfo = (
    <div>
      {blog.url} <br />
      {blog.likes} <button className='like-button' onClick={() => handleLike(blog)}>like</button> <br />
      {blog.user.name}

    </div>
  )




  return (
    <div className='blog' style={blogStyle}>
      <b>{blog.title}</b> {blog.author} {' '}
      {user.username === blog.user.username &&
        <button className='delete-button'
          onClick={() => handleDelete(blog)}>delete</button>}
      {blogInfo}
    </div>)
}

export default Blog
