import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'


const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}


export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }

}

export const checkLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }

  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      dispatch(setNotification(`Logged in successfully as ${credentials.username}`, 5))
      blogService.setToken(user.token)

    } catch (error) {
      dispatch(setNotification('wrong credentials', 5))

    }


  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setNotification('Logged out successfully', 5))

    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default reducer