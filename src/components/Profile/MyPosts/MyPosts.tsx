import React, {FC} from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import MyPostsForm from './MyPostsForm'
import Preloader from '../../common/Preloader/Preloader'
import {ProfileType} from "../../../types/types";

type PostsDataType = {
    id: number
    message: string
}
type PropsType = {
    profile: ProfileType | null
    postsData: Array<PostsDataType>
    addPost: (postText: string) => void
}
const MyPosts: FC<PropsType> = React.memo(({profile, postsData, addPost}) => {
  if (!profile) {
    return <Preloader />
  }
  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <div className={s.posts}>
        {postsData.map((elem) => {
          return (
            <Post
              message={elem.message}
              key={elem.id}
              img={profile.photos.large}
            />
          )
        })}
      </div>
        <MyPostsForm addPost={addPost} />
    </div>
  )
})

export default MyPosts
