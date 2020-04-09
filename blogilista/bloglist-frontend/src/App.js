import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import { checkLogin } from './reducers/sessionReducer'
import {
  Switch, Route, Redirect, useRouteMatch
} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import Users from './components/Users'
import { initializeUsers } from './reducers/userReducer'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const userMatch = useRouteMatch('/users/:id')
  const userToDisplay = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToDisplay = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null



  return (
    <div>
      <h2>Blog app</h2>
      <Menu />
      <Notification />
      <Switch>
        <Route path="/login">
          {user && <Redirect to="/" />}

          <LoginForm />
        </Route>
        <Route path="/users/:id">
          <User user={userToDisplay} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blogToDisplay} />
        </Route>
        <Route path="/">
          {!user && <Redirect to="/login" />}
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}

export default App