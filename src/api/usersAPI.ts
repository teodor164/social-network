import {CustomType, instance} from "./api"


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
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data)
    },
    unfollow(id: number) {
        return instance.delete<CustomType>(`follow/${id}`)
    },
    follow(id: number) {
        return instance.post<CustomType>(`follow/${id}`, {})
    },
}