import React from 'react'
import Preloader from '../common/Preloader/Preloader'
import s from './Header.module.css'
import {Avatar, Button, Col, Menu, Row} from "antd";
import {MessageOutlined, SettingOutlined,
    UsergroupDeleteOutlined, UserOutlined, WechatOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import {getAuthFetching, getLogin} from "../../redux/Selectors/headerSelectors";
import {getIsAuth} from "../../redux/Selectors/usersSelectors";
import {userLogOut} from "../../redux/authReducer";
import {NavLink} from "react-router-dom";

export const AppHeader = () => {

    const isFetching = useSelector(getAuthFetching)
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)

    const dispatch = useDispatch()

    const LogOut = () => {
        dispatch(userLogOut())
    }

    return (
        <>
            {isFetching ? <Preloader/> : (
                <Header className="site-layout-background" style={{padding: 0}}>
                    {isAuth ? (
                        <Row>
                            <Col span={18}>
                                <Menu theme="dark" mode="horizontal" className={s.altMenu}>
                                    <Menu.Item key="1" className={s.altMenuItem}>
                                        <NavLink to="/profile">
                                            <UserOutlined style={{fontSize: '19px'}}/>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="2" className={s.altMenuItem}>
                                        <NavLink to="/dialogs">
                                            <MessageOutlined style={{fontSize: '19px'}}/>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="3" className={s.altMenuItem}>
                                        <NavLink to="/users">
                                            <UsergroupDeleteOutlined style={{fontSize: '19px'}}/>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="4" className={s.altMenuItem}>
                                        <NavLink to="/settings">
                                            <SettingOutlined style={{fontSize: '19px'}}/>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="5" className={s.altMenuItem}>
                                        <NavLink to="/chat">
                                            <WechatOutlined style={{fontSize: '19px'}}/>
                                        </NavLink>
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col span={6} className={s.loginBlock}>
                                <div>
                                    <span className={s.hiddenLoginBlock}>
                                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                        <span className={s.nickName}>{login}</span>
                                    </span>
                                    <Button onClick={() => LogOut()}>Logout</Button>
                                </div>
                            </Col>
                        </Row>
                    ) : null}
                </Header>
            )}
        </>

    )
}
