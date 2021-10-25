import { profileAPI } from '../api/api'
const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

let initialState = {
  postsData: [
    { id: 1, message: 'How are you?' },
    { id: 2, message: "It's my first post" },
    { id: 3, message: "It's my second post" },
    { id: 4, message: "It's my 4th post" },
  ],
  profile: null,
  status: '',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        postsData: [
          ...state.postsData,
          {
            id: 5,
            message: action.postText,
            like: 0,
          },
        ],
      }
    }
    case DELETE_POST: {
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id != action.postId),
      }
    }

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile }

    case SET_STATUS:
      return { ...state, status: action.status }

    default:
      return state
  }
}

export const addPost = (postText) => ({ type: ADD_POST, postText })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
})

export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
})

export const getStatus = (userId) => {
  return async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
  }
}

export const updateStatus = (status) => {
  return async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  }
}

export const getProfileInfo = (userId) => {
  return async (dispatch) => {
    let response = await profileAPI.getProfileInfo(userId)
    dispatch(setUserProfile(response.data))
  }
}

export default profileReducer
