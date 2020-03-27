import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState(null)


    const handleCreate = async (event) => {
        event.preventDefault()


        try {
            const post = await blogService.create({ title, author, url })
            addBlog(post)
            setTitle('')
            setAuthor('')
            setUrl('')
            setMessage(`Created blog: ${post.title}`)
            setTimeout(() => { setMessage(null) }, 5000)

            

        } catch (exception) {
            console.log(exception)
            setMessage('blog creation FAILED', exception)
            setTimeout(() => { setMessage(null) }, 5000)

        }



    }



    return (
        <div>
            <Notification message={message}/>
            <h2>create new blog</h2>
            <form onSubmit={handleCreate}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    ></input>
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form >
        </div>
    )
}


export default BlogForm