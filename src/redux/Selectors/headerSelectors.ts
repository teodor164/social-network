import {AppStateType} from "../reduxStore";

export const getAuthFetching = (state: AppStateType) =>  state.auth.isFetching

export const getLogin = (state: AppStateType) => state.auth.login
