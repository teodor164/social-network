import { authAPI, securityAPI } from '../api/api'
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'samurai-JS/auth/SET_USER_DATA'
const TOGGLE_IS_FETCHING = 'samurai-JS/auth/TOGGLE_IS_FETCHING'
const GET_CAPTCHA = 'samuraiJS/auth/GET_CAPTCHA'

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null,
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

    case GET_CAPTCHA:
      return { ...state, captchaUrl: action.text }

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

export const getCaptchaUrlSucces = (text) => ({
  type: GET_CAPTCHA,
  text,
})

export const authMe = () => async (dispatch) => {
  const response = await authAPI.auth()
  if (response.data.resultCode === 0) {
    const { id, email, login } = response.data.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}

export const userLogin =
  (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
      dispatch(authMe())
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl())
      }
      const err =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : 'Some error'
      dispatch(stopSubmit('login', { _error: err }))
    }
  }

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptcha()
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrlSucces(captchaUrl))
}

export const userLogOut = () => {
  return async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
  }
}

export default authReducer
