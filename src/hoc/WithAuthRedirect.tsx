import React, {ComponentType} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {AppStateType} from "../redux/reduxStore";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
} as MapPropsType)

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {

}

export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props)  => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to={'/login'}/>

        return <WrappedComponent {...restProps as WCP} />
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>
    (mapStateToPropsForRedirect, {})
    (RedirectComponent)

    return ConnectedAuthRedirectComponent
}
