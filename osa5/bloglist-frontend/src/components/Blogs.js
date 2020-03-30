import Blog from './Blog'
import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const noteFormRef = React.createRef()


const Blogs = ({ user, setMessage }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function fetchData() {

            const result = await blogService.getAll()
            const sortedBlogs = result.sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBlogs)

        }
        fetchData()
    }, [])

    const addBlog = (blog) => {
        noteFormRef.current.toggleVisibility()

        setBlogs(blogs.concat(blog))
    }

    const handleDelete = async (blog) => {
        if (!window.confirm(`Do you really want to delete ${blog.name}`)) return
        try {
            const id = blog.id

            const post = await blogService.remove(id)
            setBlogs(blogs.filter(blog => blog.id !== id))
            console.log(`Deleted blog: ${post.title}`)
        } catch (exception) {
            console.log(exception)
            console.log('blog delete FAILED', exception)
        }
    }

    const handleLike = async (blog) => {
        try {
            const updatedBlog = {
                likes: blog.likes + 1,
                user: blog.user.id,
                author: blog.author,
                url: blog.url,
                title: blog.title
            }
            const post = await blogService.update(blog.id, updatedBlog)
            console.log(`Updated blog: ${post.title}`)
            setBlogs(blogs.map(b => b.id !== blog.id ? b : { ...blog, likes: blog.likes + 1 }))

        } catch (exception) {
            console.log(exception)
            console.log('blog creation FAILED', exception)
        }
    }



    return (
        <div>
            <h2>blogs</h2>

            <Togglable buttonLabel="new blog" ref={noteFormRef}>

                <BlogForm addBlog={addBlog} />
            </Togglable>
            <br />
            <i>Click on a blogpost to show/hide</i>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}
                    user={user}
                    handleDelete={handleDelete}
                    handleLike={handleLike} />
            )}


        </div>
    )
}

export default Blogs