import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Users.module.css'

let User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <div>
        <NavLink to={`/profile/${user.id}`}>
          <img
            src={
              user.photos.small != null
                ? user.photos.small
                : 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'
            }
            className={styles.userPhoto}
          />
        </NavLink>
      </div>
      <div>
        {user.followed ? (
          <button
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => {
              unfollow(user.id)
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => {
              follow(user.id)
            }}
          >
            Follow
          </button>
        )}
      </div>

      <div>{user.name}</div>
      <div>{user.status}</div>
    </div>
  )
}

export default User
