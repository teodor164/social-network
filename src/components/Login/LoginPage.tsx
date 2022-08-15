import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {userLogin} from '../../redux/authReducer'
import {createField, getStringKeys, MyInput} from '../common/FormsControl/FormsControl'
import {required} from '../../utils/validators'
import s from './Login.module.css'
import {AppStateType} from "../../redux/reduxStore";
import {Redirect} from "react-router-dom";

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType>
    = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesKeyType>('Email', "email", MyInput, [required], null)}
            {createField<LoginFormValuesKeyType>('Password', 'password', MyInput, [required], 'password')}
            {captchaUrl && <img src={captchaUrl} alt={''}/>}
            {captchaUrl &&
            createField<LoginFormValuesKeyType>('Symbols form image', 'captcha', MyInput, [required], null)}
            {error && <div className={s.formSummaryError}>{error}</div>}
            <div className={s.login__button}>
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
            <div className={s.login__container}>
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
