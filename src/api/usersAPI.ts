import {DefaultResponseType, instance} from "./api"


type UsersType = {
    id: number
    name: string
    status: string
    photos: {small: string, large: string}
    followed: boolean
}
type getUsersType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string= '', friend: null | boolean = null) {
        return instance
            .get<getUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`) )
            .then((response) => response.data)
    },
    unfollow(id: number) {
        return instance.delete<DefaultResponseType>(`follow/${id}`).then((response) => response.data)
    },
    follow(id: number) {
        return instance.post<DefaultResponseType>(`follow/${id}`, {}).then((response) => response.data)
    },
}