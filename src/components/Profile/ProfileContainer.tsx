import React, {ComponentType} from 'react'
import {
    getProfileInfo,
    getStatus,
    updateStatus,
    savePhoto,
    actions,
    saveData,
} from '../../redux/profileReducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {withAuthRedirect} from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {submit} from 'redux-form'
import {AppStateType} from "../../redux/reduxStore"
import {PostDataType, ProfileType} from "../../types/types"
import MyPosts from "./MyPosts/MyPosts"
import {RouteComponentProps} from "react-router-dom"

type PropsType = {
    match: any
    authorizedUserId: number
    profile: ProfileType
    status: string
    editMode: boolean
    postsData: Array<PostDataType>

    submit: () => void
    saveData: () => void
    toggleEditMode: () => void
    savePhoto: (file: File) => void
    updateStatus: () => void
    getProfileInfo: (userId: number) => void
    getStatus: (userId: number) => void
    addPost: (postText: string) => void
}
type PathParamsType = {
    userId: string
}

class Profile extends React.Component<PropsType & RouteComponentProps<PathParamsType>> {
    refreshProfile() {
        let userId = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getProfileInfo(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <>
                <ProfileInfo
                    {...this.props}
                    isOwner={!this.props.match.params.userId}
                />
                <MyPosts
                    profile={this.props.profile}
                    addPost={this.props.addPost}
                    postsData={this.props.postsData}
                />
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
    editMode: state.profilePage.editMode,
    postsData: state.profilePage.postsData,
})

export default compose<ComponentType>(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {
        submit,
        getProfileInfo,
        savePhoto,
        getStatus,
        updateStatus,
        saveData,
        toggleEditMode: actions.toggleEditMode,
        addPost: actions.addPost
    })
)(Profile)
