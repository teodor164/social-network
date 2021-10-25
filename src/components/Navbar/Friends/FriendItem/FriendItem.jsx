import React from 'react'
import s from './FriendItem.module.css'

const FriendItem = (props) => {
  return (
    <div className={s.item}>
      <img src={props.img}></img>
      {props.name}
    </div>
  )
}

export default FriendItem
