import React, {FC} from 'react'
import s from './Post.module.css'
import profileDefault from './../../../../assets/images/profile.png'

type PropsType = {
    img: string | null
    message: string
}
const Post: FC<PropsType> = ({img, message}) => {
  return (
    <div className={s.itemBox}>
      <div className={s.itemContent}>
        <div className={s.imgBox}>
          <img src={img || profileDefault} />
        </div>
        <div className={s.text}>{message}</div>
      </div>
    </div>
  )
}

export default Post
