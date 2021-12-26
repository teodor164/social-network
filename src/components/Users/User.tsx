import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Users.module.css'
import {UserType} from "../../types/types";


type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isAuth: boolean
}
let User: FC<PropsType> = ({user, followingInProgress, unfollow, follow, isAuth}) => {
    return (
        <div className={styles.userContainer}>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img
                        src={
                            user.photos.small != null
                                ? user.photos.small
                                : 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'
                        }
                        alt='userPhoto'
                        className={styles.userPhoto}
                    />
                </NavLink>
            </div>
            {isAuth && (
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
            )}
            <div className={styles.userDescription}>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </div>

        </div>
    )
}

export default User
