import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import MyPostsForm from './MyPostsForm'
import Preloader from '../../common/Preloader/Preloader'

const MyPosts = React.memo((props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <div className={s.posts}>
        {props.postsData.map((elem) => {
          return (
            <Post
              message={elem.message}
              key={elem.id}
              profile={props.profile}
            />
          )
        })}
      </div>
      <div>
        <MyPostsForm addPostBtt={props.addPostBtt} />
      </div>
    </div>
  )
})

export default MyPosts
