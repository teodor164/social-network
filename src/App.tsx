import React, {Component, ComponentType} from 'react'
import {HashRouter, NavLink, Redirect, Route, withRouter} from 'react-router-dom'
import './App.css'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import {LoginPage} from './components/Login/LoginPage'
import Profile from './components/Profile/ProfilePage'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import store, {AppStateType} from './redux/reduxStore'
import LazyLoading from './hoc/LazyLoading'
import {Users} from "./components/Users/Users"
import 'antd/dist/antd.css'
import {Layout, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {AppHeader} from "./components/Header/Header";
import {withAuthRedirect} from "./hoc/WithAuthRedirect";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

const SettingsContainer = React.lazy(() => import('./components/Settings/Settings'))
const ChatPage = React.lazy(() => import('./pages/Chat/Chat'))

const LazyChat = LazyLoading(ChatPage)
const LazySettings = LazyLoading(SettingsContainer)
const UsersPage = withAuthRedirect(Users)


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
    toggleCollapseMode: (collapsed: boolean) => void
}

class App extends Component<MapPropsType & DispatchPropsType> {


    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occurred')
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
            <Layout>
                <AppHeader/>
                <Content className='main__container'>
                    <Layout className="site-layout-background">
                        {this.props.isAuth ? (
                            <Sider className="site-layout-background navbar" width={200} style={{padding: '0'}}>
                                <Menu
                                    mode="inline"
                                    defaultOpenKeys={['sub1']}
                                    style={{height: '100%'}}
                                >
                                    <SubMenu key="sub1" icon={<UserOutlined/>} title="Profile">
                                        <Menu.Item key="1">
                                            <NavLink to="/profile">My Profile</NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <NavLink to="/dialogs">Messages</NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="3">
                                            <NavLink to="/chat">Common Chat</NavLink>
                                        </Menu.Item>
                                    </SubMenu>
                                    <Menu.Item key="4">
                                        <NavLink to="/users">Find Users</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="5">
                                        <NavLink to="/settings">Settings</NavLink>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                        ) : null}
                        <Content style={{minHeight: 280}}>
                            <Route exact path="/" render={() => <Redirect to={'/profile'}/>}/>
                            <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                            <Route path="/profile/:userId?" render={() => <Profile/>}/>
                            <Route path="/settings" render={() => <LazySettings/>}/>
                            <Route path="/users" render={() => <UsersPage/>}/>
                            <Route path="/login" render={() => <LoginPage/>}/>
                            <Route path="/chat" render={() => <LazyChat/>}/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Rogoznec Maxim Social Network 2022</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
    collapsed: state.app.collapsed,
    isAuth: state.auth.isAuth
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
