import React from 'react'
import Pagination from '../common/Pagination/Pagination'
import User from './User'
import UserSearchForm from "./UserSearchForms"
import {actions, FilterType, follow, requestUsers, unfollow} from "../../redux/usersReducer"
import {useDispatch, useSelector} from "react-redux"
import {getFollowingInProgress, getIsAuth, getTotalUsersCount, getUsersData} from "../../redux/usersSelectors"

type PropsType = {
    currentPage: number
    pageSize: number
    filter: FilterType
}
const Users: React.FC<PropsType> = ({currentPage, pageSize, filter}) => {

    const users = useSelector(getUsersData)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const isAuth = useSelector(getIsAuth)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    const onPageChanged = (currentPage: number) => {
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(requestUsers(currentPage, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followUser = (userID: number) => {
        dispatch(follow(userID))
    }

    const unfollowUser = (userID: number) => {
        dispatch(unfollow(userID))
    }

    return (
        <div>
            <UserSearchForm onFilterChanged={onFilterChanged}/>
            <Pagination
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
            />
            {users.map((u) => (
                <User
                    user={u}
                    key={u.id}
                    followingInProgress={followingInProgress}
                    unfollow={unfollowUser}
                    follow={followUser}
                    isAuth={isAuth}
                />
            ))}
        </div>
    )
}

export default Users
