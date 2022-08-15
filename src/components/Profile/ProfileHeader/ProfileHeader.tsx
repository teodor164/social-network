import {ProfileType} from "../../../types/types";
import React, {ChangeEvent} from "react";
import s from "./ProfileHeader.module.css";
import profilePhoto from "../../../assets/images/profile.png";
import ProfileStatus from "./ProfileStatus";

type ProfileHeaderPropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string

    updateStatus: () => void
    savePhoto: (file: File) => void
}
export const ProfileHeader: React.FC<ProfileHeaderPropsType> = (props) => {
    const {savePhoto, profile, isOwner, status, updateStatus} = props
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.profile__header__container}>
            <label className={s.avatar__container}>
                <img src={profile.photos.large || profilePhoto}/>
                {isOwner &&
                <input type="file" name="myfile" style={{display: 'none'}} onChange={onMainPhotoSelected}/>}
            </label>
            <div>
                <div className={s.profile__name}>{profile.fullName}</div>
                <ProfileStatus
                    isOwner={isOwner}
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    )
}