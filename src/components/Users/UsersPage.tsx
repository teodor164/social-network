import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {getCurrentPage, getIsFetching, getPageSize, getUsersFilter,} from '../../redux/usersSelectors'
import {requestUsers} from "../../redux/usersReducer";



type UsersPagePropsType = {
    pageTitle: string
}
export const UsersPage: React.FC<UsersPagePropsType> = () => {

    const isFetching = useSelector(getIsFetching)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    return <>
            {isFetching ? (
                <Preloader/>
            ) : (
                <Users
                    currentPage={currentPage}
                    pageSize={pageSize}
                    filter={filter}
                />
            )}
        </>
}

