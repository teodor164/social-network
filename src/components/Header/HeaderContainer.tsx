import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { userLogOut } from '../../redux/authReducer'
import {AppStateType} from "../../redux/reduxStore";

type PropsType = {
  isAuth: boolean
  isFetching: boolean
  login: string | null

  userLogOut: () => void
}
class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <Header {...this.props} />
  }
}

let mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  isFetching: state.auth.isFetching,
})

export default connect(mapStateToProps, { userLogOut })(HeaderContainer)
