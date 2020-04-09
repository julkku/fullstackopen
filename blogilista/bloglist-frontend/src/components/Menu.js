import React from 'react'
import LoggedIn from './users/LoggedIn'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const MenuDiv = styled.div`
  display: flex;
  background: #F56476;
  padding: 5px;
  width: 50%;
`
const MenuLink = styled(Link)`
  margin-right: 5px;
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;

  }
  `

const Menu = () => {



  return (
    <MenuDiv>
      <MenuLink to='/'>blogs</MenuLink>
      <MenuLink to='/users'>users</MenuLink> 
      <LoggedIn />
    </MenuDiv>
  )
}
export default Menu