import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'


const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOG': {
      const blogs = state.filter(blog => blog.id !== action.id)
      return blogs
    }
    case 'CREATE_BLOG': {
      return state.concat(action.data)
    }
    case 'LIKE_BLOG': {
      const blogs = state.map(blog => blog.id !== action.data.id ? blog : action.data)
      return blogs
    }
    default:
      return state
  }

}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: 'DELETE_BLOG',
        id: blog.id
      })
      dispatch(setNotification(`Deleted blog: ${blog.title}`, 5))
    } catch (exception) {
      console.log(exception)
      console.log('blog delete FAILED', exception)
    }
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    try {
      const post = await blogService.create(blog)
      dispatch(setNotification(`Created blog: ${blog.title}`, 5))
      dispatch({
        type: 'CREATE_BLOG',
        data: post
      })

    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('blog creation failed', 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = {
        likes: blog.likes + 1,
        user: blog.user.id,
        author: blog.author,
        url: blog.url,
        title: blog.title
      }
      const post = await blogService.update(blog.id, updatedBlog)
      dispatch({
        type: 'LIKE_BLOG',
        data: post
      })
      dispatch(setNotification(`Liked blog: ${blog.title}`, 5))
    } catch (exception) {
      dispatch(setNotification('blog like failed', 5))
    }
  }
}

export default blogReducer