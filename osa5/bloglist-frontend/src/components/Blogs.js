import Blog from './Blog'
import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'



const Blogs = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const addBlog = (blog) => {
        setBlogs(blogs.concat(blog))
    }

    return (
        <div>
            <h2>blogs</h2>



            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

            <BlogForm addBlog={addBlog} />
        </div>
    )
}

export default Blogs