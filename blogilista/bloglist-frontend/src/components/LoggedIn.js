import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/sessionReducer'

const User = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }


  return (
    <div>
      {user && (
        <p>Logged in as {user.name} <button onClick={() => handleLogout()}>logout</button></p>
      )}
    </div>
  )
}
export default User