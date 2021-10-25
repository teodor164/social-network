import React from 'react'
import s from './Post.module.css'
import profileDefault from './../../../../assets/images/profile.png'

const Post = (props) => {
  return (
    <div className={s.itemBox}>
      <div className={s.itemContent}>
        <div className={s.imgBox}>
          <img src={props.profile.photos.large || profileDefault} />
        </div>
        <div className={s.text}>{props.message}</div>
      </div>
    </div>
  )
}

export default Post
