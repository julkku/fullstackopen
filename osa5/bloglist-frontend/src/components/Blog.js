import React, { useState } from 'react'

const Blog = ({ blog, user, handleDelete, handleLike }) => {
  const [hidden, setHidden] = useState(true)


  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    width: '500px',
  }

  const blogInfo = (
    <div>
      {blog.url} <br />
      {blog.likes} <button className='like-button' onClick={() => handleLike(blog)}>like</button> <br />
      {blog.user.name}

    </div>
  )


  const togglehidden = () => {
    setHidden(!hidden)
  }


  return (
    <div className='blog' style={blogStyle} onClick={togglehidden}>
      <b>{blog.title}</b> {blog.author} {' '}
      {user.username === blog.user.username &&
        <button className='delete-button'
          onClick={() => handleDelete(blog)}>delete</button>}
      {!hidden && blogInfo}
    </div>)
}

export default Blog
