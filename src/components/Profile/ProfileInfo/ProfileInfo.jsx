import React from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import profilePhoto from './../../../assets/images/profile.png'
import ProfileData from './ProfileData/ProfileData'

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  toggleEditMode,
  editMode,
  saveData,
  submit,
}) => {
  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  return (
    <div className={s.description}>
      <div className={s.imgBox}>
        <img className={s.ava} src={profile.photos.large || profilePhoto} />
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
      </div>
      <div>
        <div className={s.name}>{profile.fullName}</div>
        <ProfileStatus
          isOwner={isOwner}
          status={status}
          updateStatus={updateStatus}
        />
        <ProfileData
          profile={profile}
          toggleEditMode={toggleEditMode}
          isOwner={isOwner}
          editMode={editMode}
          saveData={saveData}
          submit={submit}
        />
      </div>
    </div>
  )
}

export default ProfileInfo
