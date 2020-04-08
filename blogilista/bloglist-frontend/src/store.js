import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import sessionReducer from './reducers/sessionReducer'
import userReducer from './reducers/userReducer'



const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: sessionReducer,
  users: userReducer
})


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store