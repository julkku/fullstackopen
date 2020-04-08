import React from 'react'
const User = ({ user }) => {
  if (!user) return ''

  return (
    <div>
      <h2>{user.name}</h2>

      <b>Added blogs</b>

      <ul>
        {user.blogs.map(blog => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}
export default User