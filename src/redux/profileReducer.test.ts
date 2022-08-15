import profileReducer, {actions} from './profileReducer'


let initialState = {
    postsData: [
        {id: 1, message: 'How are you?'},
        {id: 2, message: "It's my first post"},
        {id: 3, message: "It's my second post"},
        {id: 4, message: "It's my 4th post"},
    ],
    profile: null,
    status: '',
    editMode: false,
}

it('length of post should be incremented', () => {
    let action = actions.addPost('bla  bla bla')
    let newState = profileReducer(initialState, action)

    expect(newState.postsData.length).toBe(5)
})

it('message of new post should be correct', () => {
    let action = actions.addPost('bla  bla bla')
    let newState = profileReducer(initialState, action)

    expect(newState.postsData[4].message).toBe('bla  bla bla')
})

it('lenght of posts should be decremented', () => {
    let action = actions.deletePost(1)
    let newState = profileReducer(initialState, action)

    expect(newState.postsData.length).toBe(3)
})
