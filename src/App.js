import React from 'react'
import { Component } from 'react'
import { HashRouter, Route, withRouter } from 'react-router-dom'
import './App.css'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/ProfileContainer'
import UsersContainer from './components/Users/UsersContainer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import store from './redux/reduxStore'
import { Provider } from 'react-redux'
import LazyLoading from './hoc/LazyLoading'
import { Redirect } from 'react-router'

const SettingsContainer = React.lazy(() =>
  import('./components/Settings/Settings')
)

class App extends Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    alert('Some error occured')
    console.error(promiseRejectionEvent)
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.catchAllUnhandledErrors
    )
  }

  render() {
    if (!this.props.initialized) return <Preloader />

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <div className="all-info-page">
          <Navbar />
          <div className="contextBox">
            <Route exact="/" render={() => <Redirect to={'/profile'} />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/profile/:userId?" render={() => <Profile />} />
            <Route path="/settings" render={LazyLoading(SettingsContainer)} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

const SamuraiJSApp = (props) => {
  return (
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </HashRouter>
    </React.StrictMode>
  )
}

export default SamuraiJSApp
