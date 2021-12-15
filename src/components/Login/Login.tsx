import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {userLogin} from '../../redux/authReducer'
import {createField, getStringKeys, Input} from '../common/FormsControl/FormsControl'
import {required} from '../../utils/validators'
import {Redirect} from 'react-router'
import s from './../common/FormsControl/FormsControl.module.css'
import {AppStateType} from "../../redux/reduxStore";

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType>
    = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesKeyType>('Email', "email", Input, [required], null)}
            {createField<LoginFormValuesKeyType>('Password', 'password', Input, [required], 'password')}
            {createField<LoginFormValuesKeyType>(undefined, 'rememberMe', Input, [], 'checkbox', 'Remember me')}
            {captchaUrl && <img src={captchaUrl} alt={''}/>}
            {captchaUrl &&
            createField<LoginFormValuesKeyType>('Symbols form image', 'captcha', Input, [required], null)}
            {error && <div className={s.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({
    form: 'login',
})(LoginForm)

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = ({email, password, rememberMe, captcha}: LoginFormValuesType) => {
        props.userLogin(email, password, rememberMe, captcha)
    }

    return props.isAuth ? (
        <Redirect to={'/profile'}/>
    ) : (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default compose(connect(mapStateToProps, {userLogin}))(Login)

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}
type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    userLogin: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesKeyType = getStringKeys<LoginFormValuesType>