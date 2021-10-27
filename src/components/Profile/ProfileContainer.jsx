import React from 'react'
import {
  getProfileInfo,
  getStatus,
  updateStatus,
  savePhoto,
  toggleEditMode,
  saveData,
} from '../../redux/profileReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { submit } from 'redux-form'

class Profile extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
    }
    this.props.getProfileInfo(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
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
        <MyPostsContainer />
      </>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
  editMode: state.profilePage.editMode,
})

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    submit,
    getProfileInfo,
    getStatus,
    updateStatus,
    savePhoto,
    toggleEditMode,
    saveData,
  })
)(Profile)
