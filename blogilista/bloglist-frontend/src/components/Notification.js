import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'


const NotificationDiv = styled.div`
  font-size: 20px;
  color: black;
  background: #CC7E85;
  border-style: solid;
  border-radius: 5px;
  border-color: black;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 50%;
`

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (message === null) {
    return null
  }


  return (
    <NotificationDiv>
      {message}
    </NotificationDiv>
  )
}

export default Notification