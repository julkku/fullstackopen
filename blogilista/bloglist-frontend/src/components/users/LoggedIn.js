import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/sessionReducer'
import { Button } from '../styles'
import styled from 'styled-components'


const Name = styled.span`
  color: black;
`

const Text = styled.span`
  color: #2d2b2c;
`

const User = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }


  return (
    <div>
      {user && (
        <Text> Logged in as <Name>{user.name}</Name> <Button onClick={() => handleLogout()}>logout</Button></Text>
      )}
    </div>
  )
}
export default User