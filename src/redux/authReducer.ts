import {ResultCodeEnum, ResultCodeForCaptcha} from '../api/api'
import {stopSubmit} from 'redux-form'
import { DefaultThunkType, InferActionTypes} from "./reduxStore";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'socialNetwork/auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }

        case 'socialNetwork/auth/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}

        case 'socialNetwork/auth/GET_CAPTCHA':
            return {...state, captchaUrl: action.text}

        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'socialNetwork/auth/SET_USER_DATA',
        payload: {id, email, login, isAuth},
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'socialNetwork/auth/TOGGLE_IS_FETCHING',
        isFetching,
    } as const),
    getCaptchaUrlSuccess: (text: string) => ({
        type: 'socialNetwork/auth/GET_CAPTCHA',
        text,
    } as const)
}

export const authMe = (): ThunkType => async (dispatch) => {
    const response = await authAPI.auth()
    if (response.resultCode === ResultCodeEnum.success) {
        const {id, email, login} = response.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const userLogin =
    (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.resultCode === ResultCodeEnum.success) {
            dispatch(authMe())
        } else {
            if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            const err =
                response.messages.length > 0
                    ? response.messages[0]
                    : 'Some error'
            dispatch(stopSubmit('login', {_error: err}))
        }
    }

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const userLogOut = (): ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === ResultCodeEnum.success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer

export type initialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = DefaultThunkType<ActionsTypes>

