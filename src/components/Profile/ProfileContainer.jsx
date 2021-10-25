import React from 'react'
import Profile from './Profile'
import {
  getProfileInfo,
  getStatus,
  updateStatus,
} from '../../redux/profileReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
    }
    this.props.getProfileInfo(userId)
    this.props.getStatus(userId)
  }

  render() {
    return <Profile {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
})

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, { getProfileInfo, getStatus, updateStatus })
)(ProfileContainer)
