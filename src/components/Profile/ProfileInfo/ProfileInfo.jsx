import React from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks.jsx'
import profilePhoto from './../../../assets/images/profile.png'

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />
  }

  return (
    <div className={s.description}>
      <div className={s.imgBox}>
        <img
          src={!profile.photos.large ? profilePhoto : profile.photos.large}
          className={s.ava}
        />
      </div>
      <div className={s.name}>{profile.fullName}</div>
      <div className={s.status}>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo
