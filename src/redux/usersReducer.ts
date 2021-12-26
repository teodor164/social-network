import {DefaultResponseType, ResultCodeEnum} from '../api/api'
import {updateObjectInArray} from '../utils/object-helpers'
import {UserType} from "../types/types";
import {DefaultThunkType, InferActionTypes} from "./reduxStore";
import {Dispatch} from "redux";
import {usersAPI} from "../api/usersAPI";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 16,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of usersId
    portionSize: 10,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'socialNetwork/users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: true,
                }),
            }
        case 'socialNetwork/users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: false,
                }),
            }
        case 'socialNetwork/users/SET_USERS':
            return {...state, users: action.users}

        case 'socialNetwork/users/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage,
            }

        case 'socialNetwork/users/SET_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsers}

        case 'socialNetwork/users/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}

        case 'socialNetwork/users/SET_FILTER':
            return {...state, filter: action.payload}

        case 'socialNetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId),
            }

        default:
            return state
    }
}

export const actions = {
    followSuccess: (userId: number) => ({
        type: 'socialNetwork/users/FOLLOW',
        userId,
    } as const),
    unfollowSuccess: (userId: number) => ({
        type: 'socialNetwork/users/UNFOLLOW',
        userId,
    } as const),
    setUsers: (users: Array<UserType>) => ({
        type: 'socialNetwork/users/SET_USERS',
        users,
    } as const),
    setFilter: (filter: FilterType) => ({
        type: 'socialNetwork/users/SET_FILTER',
        payload: filter,
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'socialNetwork/users/SET_CURRENT_PAGE',
        currentPage,
    } as const),
    setTotalUsersCount: (totalUsers: number) => ({
        type: 'socialNetwork/users/SET_USERS_COUNT',
        totalUsers,
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'socialNetwork/users/TOGGLE_IS_FETCHING',
        isFetching,
    } as const),
    toggleIsFollowingProgress: (followingInProgress: boolean, userId: number) => ({
        type: 'socialNetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS',
        followingInProgress,
        userId,
    } as const)
}

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))

        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
        dispatch(actions.toggleIsFetching(false))
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number,
                                   apiMethod: (userId: number) => Promise<DefaultResponseType>,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === ResultCodeEnum.success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(
            dispatch,
            userId,
            usersAPI.follow.bind(userId),
            actions.followSuccess
        )
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(
            dispatch,
            userId,
            usersAPI.unfollow.bind(userId),
            actions.unfollowSuccess
        )
    }
}

export default usersReducer

type ActionsTypes = InferActionTypes<typeof actions>
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = DefaultThunkType<ActionsTypes>
export type FilterType = typeof initialState.filter
export type InitialStateType = typeof initialState
