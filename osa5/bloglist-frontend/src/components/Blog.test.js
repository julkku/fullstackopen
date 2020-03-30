import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'testy mc blogface',
  author: 'ghandi',
  url: 'localhost',
  likes: 0,
  user: { username: 'jules', name: 'Jumius Juminarkaus', id: '5e7c9a6673e4374a00602d88' },
  id: '5e81c0ec7cdb210614f8a8ac'
}



const user = { token: 'ABCD', username: 'jules', name: 'Jumius Juminarkaus' }

describe('blog renders correctly', () => {
  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  test('renders title and author but not url or likes', () => {

    const component = render(
      <Blog blog={blog} handleLike={mockLikeHandler} handleDelete={mockDeleteHandler} user={user} />
    )

    expect(component.container).toHaveTextContent('testy mc blogface')
    expect(component.container).toHaveTextContent('ghandi')
    expect(component.container).not.toHaveTextContent('localhost')
    expect(component.container).not.toHaveTextContent('0')


  })

  test('renders url and likes after clicking on blog', () => {

    const component = render(
      <Blog blog={blog} handleLike={mockLikeHandler} handleDelete={mockDeleteHandler} user={user} />
    )
    fireEvent.click(component.getByText('testy mc blogface'))

    expect(component.container).toHaveTextContent('testy mc blogface')
    expect(component.container).toHaveTextContent('ghandi')
    expect(component.container).toHaveTextContent('localhost')
    expect(component.container).toHaveTextContent('0')

  })
})

describe('like button', () => {
  test('fires twice when pressed twice', () => {
    const mockLikeHandler = jest.fn()
    const mockDeleteHandler = jest.fn()


    const component = render(
      <Blog blog={blog} handleLike={mockLikeHandler} handleDelete={mockDeleteHandler} user={user} />
    )

    fireEvent.click(component.getByText('testy mc blogface'))
    fireEvent.click(component.getByText('like'))
    fireEvent.click(component.getByText('testy mc blogface'))
    fireEvent.click(component.getByText('like'))
    expect(mockLikeHandler.mock.calls).toHaveLength(2)

  })
})
