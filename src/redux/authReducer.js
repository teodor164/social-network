import { authAPI } from '../api/api'
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'samurai-JS/auth/SET_USER_DATA'
const TOGGLE_IS_FETCHING = 'samurai-JS/auth/TOGGLE_IS_FETCHING'

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }

    default:
      return state
  }
}

export const setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
})

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})

export const authMe = () => async (dispatch) => {
  let response = await authAPI.auth()
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}

export const userLogin = (email, password, rememberMe) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe)
  if (response.data.resultCode === 0) {
    dispatch(authMe())
  } else {
    let err =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : 'Some error'
    dispatch(stopSubmit('login', { _error: err }))
    console.log(response.data.messages[0])
  }
}

export const userLogOut = () => {
  return async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
  }
}

export default authReducer
