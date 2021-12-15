import React, {ComponentType} from 'react'
import {Component} from 'react'
import {HashRouter, Redirect, Route, withRouter} from 'react-router-dom'
import './App.css'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/ProfileContainer'
import UsersContainer from './components/Users/UsersContainer'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import store, {AppStateType} from './redux/reduxStore'
import {Provider} from 'react-redux'
import LazyLoading from './hoc/LazyLoading'

const SettingsContainer = React.lazy(() => import('./components/Settings/Settings'))
const LazySettings = LazyLoading(SettingsContainer)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occured')
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
        if (!this.props.initialized) return <Preloader/>

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <div className="all-info-page">
                    <Navbar/>
                    <div className="contextBox">
                        <Route exact path="/" render={() => <Redirect to={'/profile'}/>}/>
                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/profile/:userId?" render={() => <Profile/>}/>
                        <Route path="/settings" render={() => <LazySettings /> }/>
                        <Route path="/users" render={() => <UsersContainer pageTitle={'Samurai'}/>}/>
                        <Route path="/login" render={() => <Login/>}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)

const SamuraiJSApp: React.FC = () => {
    return (
        <React.StrictMode>
            <HashRouter>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </HashRouter>
        </React.StrictMode>
    )
}

export default SamuraiJSApp
