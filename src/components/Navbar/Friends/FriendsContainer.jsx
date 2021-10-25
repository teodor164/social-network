import React from 'react'
import { connect } from 'react-redux'
import Friends from './Friends'

const mapStateToPropos = (state) => {
  return { state: state.sidebar.friendsData }
}

const FriendsContainer = connect(mapStateToPropos)(Friends)

export default FriendsContainer
