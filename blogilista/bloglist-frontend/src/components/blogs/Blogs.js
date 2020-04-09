import React from 'react'
import BlogForm from './BlogForm'
import Togglable from '../Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../../reducers/blogReducer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BlogDiv = styled.div`
  padding: 5px;
  border: solid;
  border-width: 1px;
  width: 50%;
  background-color: #CC7E85;
  margin: 5px;
  text-alignement: center;
`

const BlogLink = styled(Link)`
  color: black;
`


const blogFormRef = React.createRef()

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector(state => state.user)
  if (!user) {
    return null
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
        <BlogDiv key={blog.id} ><BlogLink to={`/blogs/${blog.id}`}>{blog.title}</BlogLink></BlogDiv>
      )}


    </div>
  )
}

export default Blogs