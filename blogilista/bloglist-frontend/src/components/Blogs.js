import React from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const blogFormRef = React.createRef()

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector(state => state.user)
  if (!user) {
    return null
  }

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    width: '500px',
  }


  const handleCreate = async (blog) => {
    dispatch(addBlog(blog), blogFormRef)
    blogFormRef.current.toggleVisibility()

  }


  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>

        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      <br />
      {blogs.map(blog =>
        <div style={blogStyle} key={blog.id} ><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
      )}


    </div>
  )
}

export default Blogs