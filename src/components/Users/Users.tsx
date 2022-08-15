import React, {useEffect} from 'react'
import Pagination from '../common/Pagination/Pagination'
import User from './User'
import UserSearchForm from "./UserSearchForms"
import {actions, FilterType, follow, requestUsers, unfollow} from "../../redux/usersReducer"
import {useDispatch, useSelector} from "react-redux"
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsAuth, getIsFetching, getPageSize,
    getTotalUsersCount,
    getUsersData, getUsersFilter
} from "../../redux/Selectors/usersSelectors"
import {useHistory} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import * as queryString from "querystring";

export const Users = () => {

    const users = useSelector(getUsersData)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const isAuth = useSelector(getIsAuth)
    const followingInProgress = useSelector(getFollowingInProgress)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const isFetching = useSelector(getIsFetching)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        let actualPage = currentPage
        let actualFilter = filter

        const parsed = queryString.parse(history.location.search.slice(1))
        if (parsed.page) actualPage = +parsed.page
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null :
                parsed.friend === 'true' ? true :
                    false
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        history.push({
            pathname: './users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])



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

    return <>
        {isFetching ? <Preloader/> : (
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
        )}
    </>
}
