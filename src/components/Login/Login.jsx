import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { userLogin } from '../../redux/authReducer'
import { createField, Input } from './../common/FormsControl/FormsControl'
import { required } from '../../utils/validators'
import { Redirect } from 'react-router'
import s from './../common/FormsControl/FormsControl.module.css'

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('Email', 'email', Input, [required], null)}
      {createField('Password', 'password', Input, [required], 'password')}
      {createField(null, 'rememberMe', Input, [], 'checkbox', 'Remember me')}
      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl &&
        createField('Symbols form image', 'captcha', Input, [required], null)}

      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm)

const Login = (props) => {
  const onSubmit = ({ email, password, rememberMe, captcha }) => {
    props.userLogin(email, password, rememberMe, captcha)
  }

  return props.isAuth ? (
    <Redirect to={'/profile'} />
  ) : (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  )
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
})

export default compose(connect(mapStateToProps, { userLogin }))(Login)
