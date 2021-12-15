import React from 'react'
import {connect} from 'react-redux'
import {
    follow,
    unfollow,
    actions,
    getUsers,
} from '../../redux/usersReducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {compose} from 'redux'
import {
    getIsFetching,
    getPageSize,
    getUsersData,
    getTotalUsersCount,
    getCurrentPage,
    getFollowingInProgress,
    getPortionSize,
    getIsAuth,
} from '../../redux/usersSelectors'
import {AppStateType} from "../../redux/reduxStore";
import {UserType} from "../../types/types";
// import { withAuthRedirect } from './../../hoc/WithAuthRedirect'

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    isAuth: boolean
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
type OwnPropsType = {
    pageTitle: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (currentPage: number) => {
        this.props.setCurrentPage(currentPage)
        this.props.getUsers(currentPage, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? (
                    <Preloader/>
                ) : (
                    <Users
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        followingInProgress={this.props.followingInProgress}
                        isAuth={this.props.isAuth}
                    />
                )}
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    users: getUsersData(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    portionSize: getPortionSize(state),
    isAuth: getIsAuth(state),
})

let mapDispatchToProps = (dispatch: any) => ({
    follow: (userId: number) => dispatch(follow(userId)),
    unfollow: (userId: number) => dispatch(unfollow(userId)),
    getUsers: (currentPage: number, pageSize: number) => dispatch(getUsers(currentPage, pageSize)),
    setCurrentPage: (currentPage: number) => dispatch(actions.setCurrentPage(currentPage))

})

export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer)
