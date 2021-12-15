// import { render, screen } from '@testing-library/react'
import SamuraiJSApp from './App'
import React from 'react'
import ReactDOM from 'react-dom'

// test('renders learn react link', () => {
//   render(<App />)
//   const linkElement = screen.getByText(/learn react/i)
//   expect(linkElement).toBeInTheDocument()
// })

it('render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SamuraiJSApp />, div)
  ReactDOM.unmountComponentAtNode(div)
})
