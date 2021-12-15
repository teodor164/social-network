import {stopSubmit} from 'redux-form'
import {ResultCodeEnum} from '../api/api'
import {PhotosType, PostDataType, ProfileType} from "../types/types";
import {AppStateType, DefaultThunkType, InferActionTypes} from "./reduxStore";
import {profileAPI} from "../api/profileAPI";

let initialState = {
    postsData: [
        {id: 1, message: 'How are you?'},
        {id: 2, message: "It's my first post"},
        {id: 3, message: "It's my second post"},
        {id: 4, message: "It's my 4th post"},
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: '',
    editMode: false,
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'socialNetwork/profile/ADD_POST': {
            return {
                ...state,
                postsData: [
                    ...state.postsData,
                    {
                        id: 5,
                        message: action.postText,
                    },
                ],
            }
        }
        case 'socialNetwork/profile/DELETE_POST': {
            return {
                ...state,
                postsData: state.postsData.filter((p) => p.id !== action.postId),
            }
        }

        case 'socialNetwork/profile/SET_USER_PROFILE':
            return {...state, profile: action.profile}

        case 'socialNetwork/profile/SET_STATUS':
            return {...state, status: action.status}

        case 'socialNetwork/profile/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}

        case 'socialNetwork/profile/TOGGLE_EDIT_MODE':
            return {...state, editMode: action.editMode}

        default:
            return state
    }
}

export const actions = {
    addPost: (postText: string) => ({type: 'socialNetwork/profile/ADD_POST', postText} as const),
    deletePost: (postId: number) => ({type: 'socialNetwork/profile/DELETE_POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({
        type: 'socialNetwork/profile/SET_USER_PROFILE',
        profile,
    } as const),
    setStatus: (status: string) => ({
        type: 'socialNetwork/profile/SET_STATUS',
        status,
    } as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'socialNetwork/profile/SAVE_PHOTO_SUCCESS', photos} as const),
    toggleEditMode: (editMode: boolean) => ({
        type: 'socialNetwork/profile/TOGGLE_EDIT_MODE',
        editMode,
    } as const)
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(response.data))
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === ResultCodeEnum.success) {
            dispatch(actions.setStatus(status))
        }
    }
}

export const getProfileInfo = (userId: number | null): ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.getProfileInfo(userId)
        dispatch(actions.setUserProfile(response.data))
    }
}

export const savePhoto = (photoFile: File): ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.savePhoto(photoFile)
        if (response.resultCode === ResultCodeEnum.success) {
            dispatch(actions.savePhotoSuccess(response.data.photos))
        }
    }
}

export const saveData = (data: ProfileType) => {
    return async (dispatch: any, getState: () => AppStateType) => {
        const id = getState().auth.id
        const response = await profileAPI.saveData(data)
        if (response.resultCode === ResultCodeEnum.success) {
            dispatch(getProfileInfo(id))
            dispatch(actions.toggleEditMode(false))
        } else {
            dispatch(stopSubmit('profileForm', {_error: response.messages[0]}))
        }
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = DefaultThunkType<ActionsTypes>
