import React, {ComponentType} from 'react'
import {actions} from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'
import {AppStateType} from "../../redux/reduxStore";

const mapStateToProps = (state: AppStateType) => ({
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
})

export default compose<ComponentType>(
    connect(mapStateToProps, {
        addMessage: actions.addMessage
    }),
    withAuthRedirect
)(Dialogs)
