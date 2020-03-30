import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'




test('form returns correct information to handler', () => {
  const handleCreate = jest.fn()
  const author = 'andy warhol'
  const title = 'testy mc testypost'
  const url = 'localhost'

  const component = render(
    <BlogForm handleCreate={handleCreate} />
  )
  const form = component.container.querySelector('form')

  fireEvent.change(component.container.querySelector('#title'), {
    target: { value: title }
  })

  fireEvent.change(component.container.querySelector('#author'), {
    target: { value: author }
  })

  fireEvent.change(component.container.querySelector('#url'), {
    target: { value: url }
  })
  fireEvent.submit(form)

  const submitted = handleCreate.mock.calls[0][0]
  expect(submitted.author).toBe(author)
  expect(submitted.url).toBe(url)
  expect(submitted.title).toBe(title)

})


