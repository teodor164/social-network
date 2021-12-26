import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
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

export const LoginPage = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = ({email, password, rememberMe, captcha}: LoginFormValuesType) => {
        dispatch(userLogin(email, password, rememberMe, captcha))
    }

    return isAuth ? (
        <Redirect to={'/profile'}/>
    ) : (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesKeyType = getStringKeys<LoginFormValuesType>