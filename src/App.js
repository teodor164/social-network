import React, { Suspense } from 'react'
import { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import './App.css'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/ProfileContainer'
import UsersContainer from './components/Users/UsersContainer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import store from './redux/reduxStore'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import LazyLoading from './hoc/LazyLoading'

const MusicContainer = React.lazy(() => import('./components/Music/Music'))
const NewsContainer = React.lazy(() => import('./components/News/News'))
const SettingsContainer = React.lazy(() =>
  import('./components/Settings/Settings')
)

class App extends Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) return <Preloader />

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <div className="all-info-page">
          <Navbar />
          <div className="contextBox">
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route
              path="/profile/:userId?"
              render={() => <ProfileContainer />}
            />
            <Route path="/music" render={LazyLoading(MusicContainer)} />
            <Route path="/news" render={LazyLoading(NewsContainer)} />
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
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default SamuraiJSApp
