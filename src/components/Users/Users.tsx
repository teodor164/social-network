import React from 'react'
import Pagination from '../common/Pagination/Pagination'
import User from './User'
import {UserType} from "../../types/types";

type PorpsType = {
  currentPage: number
  totalUsersCount: number
  pageSize: number
  onPageChanged: (currentPage: number ) => void
  users: Array<UserType>
  isAuth: boolean
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}
let Users: React.FC<PorpsType> = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  users,
  isAuth,
  ...props
}) => {
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      {users.map((u) => (
        <User
          user={u}
          key={u.id}
          followingInProgress={props.followingInProgress}
          unfollow={props.unfollow}
          follow={props.follow}
          isAuth={isAuth}
        />
      ))}
    </div>
  )
}

export default Users
