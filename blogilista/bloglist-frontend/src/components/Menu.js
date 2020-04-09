import React from 'react'
import LoggedIn from './LoggedIn'

import { Link } from 'react-router-dom'
const Menu = () => {

  const menuStyle = {
    display: 'flex',
    backgroundColor: 'coral',
    padding: '5px'
  }

  const linkStyle = {
    marginRight: '5px'
  }

  return (
    <div style={menuStyle}>
      <Link style={linkStyle} to='/'>blogs</Link>
      <Link style ={linkStyle} to='/users'>users</Link>
      <LoggedIn />
    </div>
  )
}
export default Menu