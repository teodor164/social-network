import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './DialogItem.module.css'

const DialogItem = (props) => {
  return (
    <div className={s.dialog}>
      <NavLink to={`/dialogs/${props.id}`} activeClassName={s.activeLink}>
        <div className={s.item}>
          <img src={props.img}></img>
          <div className={s.name}>{props.name}</div>
        </div>
      </NavLink>
    </div>
  )
}

export default DialogItem
