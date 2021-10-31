import React from 'react'
import Pagination from '../common/Pagination/Pagination'
import User from './User'

let Users = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  users,
  portionSize,
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
        portionSize={portionSize}
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
