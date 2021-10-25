import React from 'react'
import FriendItem from './FriendItem/FriendItem'
import s from './Friends.module.css'

const Friends = (props) => {
  let friendElement = props.state.map((elem) => (
    <FriendItem name={elem.name} img={elem.img} />
  ))

  return (
    <div className={s.item}>
      <div className={s.text}>Friends</div>
      <div className={s.itemsBlock}>{friendElement}</div>
    </div>
  )
}

export default Friends
