import {authMe} from './authReducer'
import { InferActionTypes} from "./reduxStore";

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'socialNetwork/app/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            }

        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'socialNetwork/app/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authMe())
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
// type ThunkType = DefaultThunkType<ActionsType>