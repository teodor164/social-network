import React from 'react'
import { addMessge } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'

let mapStateToPropos = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addMessgeBtt: (newMessageBoddy) => {
      dispatch(addMessge(newMessageBoddy))
    },
  }
}

export default compose(
  connect(mapStateToPropos, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)
