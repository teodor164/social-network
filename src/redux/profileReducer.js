import { stopSubmit } from 'redux-form'
import { profileAPI } from '../api/api'
const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES'
const TOOGLE_EDIT_MODE = 'TOOGLE_EDIT_MODE'

let initialState = {
  postsData: [
    { id: 1, message: 'How are you?' },
    { id: 2, message: "It's my first post" },
    { id: 3, message: "It's my second post" },
    { id: 4, message: "It's my 4th post" },
  ],
  profile: null,
  status: '',
  editMode: false,
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

    case SAVE_PHOTO_SUCCES:
      return { ...state, profile: { ...state.profile, photos: action.photos } }

    case TOOGLE_EDIT_MODE:
      return { ...state, editMode: action.editMode }

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

export const savePhotoSucces = (photos) => ({ type: SAVE_PHOTO_SUCCES, photos })

export const toggleEditMode = (editMode) => ({
  type: TOOGLE_EDIT_MODE,
  editMode,
})

export const getStatus = (userId) => {
  return async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
  }
}

export const updateStatus = (status) => {
  return async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  }
}

export const getProfileInfo = (userId) => {
  return async (dispatch) => {
    const response = await profileAPI.getProfileInfo(userId)
    dispatch(setUserProfile(response.data))
  }
}

export const savePhoto = (photoFile) => {
  return async (dispatch) => {
    const response = await profileAPI.savePhoto(photoFile)
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSucces(response.data.data.photos))
    }
  }
}

export const saveData = (data) => {
  return async (dispatch, getState) => {
    const id = getState().auth.id
    const response = await profileAPI.saveData(data)
    if (response.data.resultCode === 0) {
      dispatch(getProfileInfo(id))
      dispatch(toggleEditMode(false))
    } else {
      dispatch(stopSubmit('profileData', { _error: response.data.messages[0] }))
    }
  }
}

export default profileReducer
