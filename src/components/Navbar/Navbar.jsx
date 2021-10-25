import React from 'react'
import { NavLink } from 'react-router-dom'
import FriendsContainer from './Friends/FriendsContainer'
import s from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={`${s.item}`}>
        <NavLink to="/profile" activeClassName={s.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={`${s.item}`}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={`${s.item}`}>
        <NavLink to="/news" activeClassName={s.activeLink}>
          News
        </NavLink>
      </div>
      <div className={`${s.item}`}>
        <NavLink to="/music" activeClassName={s.activeLink}>
          Music
        </NavLink>
      </div>
      <div className={`${s.item}`}>
        <NavLink to="/settings" activeClassName={s.activeLink}>
          Settings
        </NavLink>
      </div>
      <div className={`${s.item} ${s.users}`}>
        <NavLink to="/users" activeClassName={s.activeLink}>
          Find Users
        </NavLink>
      </div>

      {/* <div className={`${s.item}`}>
        <FriendsContainer />
      </div> */}
    </nav>
  )
}

export default Navbar
