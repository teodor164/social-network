import React, {FC} from 'react'
import s from './../ProfileInfo.module.css'
import EditMode from './EditMode'
import {ProfileType} from "../../../../types/types";

type ProfileDataType = {
  profile: ProfileType
  isOwner: boolean
  editMode: boolean

  submit: () => void
  saveData: () => void
  toggleEditMode: () => void
}
const ProfileData: React.FC<ProfileDataType> = (props) => {
  return (
    <>
      {props.editMode ? (
        <EditMode {...props} />
      ) : (
        <StaticProfileData {...props} />
      )}
    </>
  )
}

type StaticProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  toggleEditMode: (arg: boolean) => void
}
const StaticProfileData: FC<StaticProfileDataPropsType>= ({ profile, toggleEditMode, isOwner }) => {
  return (
    <div className={s.a0001}>
      {isOwner && (
        <div
          className={s.edit}
          onClick={() => {
            toggleEditMode(true)
          }}
        >
          Edit Details
        </div>
      )}
      <div className={s.infoBlock}>
        {/* InfoBlock */}
        <div className={s.infoBox}>
          Info
          <div className={s.infoBoxItem}>
            <span className={s.key}>Full Name:</span>
            <span className={s.propertyString}> {profile.fullName}</span>
          </div>
          <div className={s.infoBoxItem}>
            <span className={s.key}>About me:</span>
            <span className={s.propertyString}> {profile.aboutMe}</span>
          </div>
          <div className={s.infoBoxItem}>
            <span className={s.key}>Is Looking For Job:</span>
            {profile.lookingForAJob ? (
              <span className={s.property}> Yes</span>
            ) : (
              <span className={s.property}> No</span>
            )}
          </div>
          <div className={s.infoBoxItem}>
            <span className={s.key}>Job status:</span>
            <span className={s.propertyString}>
              {' '}
              {profile.lookingForAJobDescription}
            </span>
          </div>
        </div>
        {/* InfoBlock */}
        {/* ContactsBlock */}
        <div className={s.infoBox}>
          Contacts
          {Object.keys(profile.contacts).map((key) => {
            return (
                <Contacts
                    contactTitle={key}
                    // @ts-ignore
                    contactValue={profile.contacts[key]}
                />
            );
          })}
        </div>
        {/* ContactsBlock */}
      </div>
    </div>
  )
}

type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}
const Contacts: FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contactBoxItem}>
      <span className={s.key}>{contactTitle}:</span>
      <span className={s.property}> {contactValue}</span>
    </div>
  )
}

export default ProfileData
