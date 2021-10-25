import profileReducer, { addPost, deletePost } from './profileReducer'
import reactDom from 'react-dom'
import React from 'react'

let initialState = {
  postsData: [
    { id: 1, message: 'How are you?', like: 15 },
    { id: 2, message: "It's my first post", like: 25 },
    { id: 3, message: "It's my second post", like: 123 },
    { id: 4, message: "It's my 4th post", like: 16 },
  ],
  profile: null,
  status: '',
}

it('length of post should be incremented', () => {
  let action = addPost('bla  bla bla')
  let newState = profileReducer(initialState, action)

  expect(newState.postsData.length).toBe(5)
})

it('message of new post should be correct', () => {
  let action = addPost('bla  bla bla')
  let newState = profileReducer(initialState, action)

  expect(newState.postsData[4].message).toBe('bla  bla bla')
})

it('lenght of posts should be decremented', () => {
  let action = deletePost(1)
  let newState = profileReducer(initialState, action)

  expect(newState.postsData.length).toBe(3)
})
