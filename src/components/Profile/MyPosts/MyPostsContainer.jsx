import React from 'react'
import { addPost } from '../../../redux/profileReducer'
import { connect } from 'react-redux'
import MyPosts from './MyPosts'

let mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    profile: state.profilePage.profile,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPostBtt: (postText) => {
      dispatch(addPost(postText))
    },
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
