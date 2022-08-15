import React, {FC} from 'react'
import s from './ProfileInfo.module.css'
import EditMode from './EditMode'
import {ProfileType} from "../../../types/types";
import {Button} from "antd";
import facebookLogo from "../../../assets/images/facebook.png";
import githubLogo from "../../../assets/images/github.png";
import twitterLogo from "../../../assets/images/twitter.png";
import instagramLogo from "../../../assets/images/instagram.png";


type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    editMode: boolean

    submit: () => void
    saveData: () => void
    toggleEditMode: () => void
}
const ProfileInfo: React.FC<ProfileDataType> = (props) => {
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
const StaticProfileData: FC<StaticProfileDataPropsType> = ({profile, toggleEditMode, isOwner}) => {
    const {facebook, instagram, twitter, github} = profile.contacts
    return (
        <div className={s.profile__info__container}>
            {isOwner && (
                <Button type="default" block onClick={() => {
                    toggleEditMode(true)
                }}
                > Edit Details </Button>
            )}
            {(!profile.aboutMe && !profile.lookingForAJobDescription) ?
                (<div className={s.profile__info__nodata}>This User did not add any info about himself</div>) :
                (<ul className={s.profile__info__list}>
                    <li>About me<br/><span>{profile.aboutMe}</span></li>
                    <li>Job status<br/><span>{profile.lookingForAJobDescription}</span></li>
                </ul>)}

            <div className={s.profile__contacts__container}>
                <div>Contacts</div>
                <div className={s.profile__contacts__list}>
                    {facebook && <a href={`${facebook}`}><img src={facebookLogo}/></a>}
                    {instagram && <a href={`${instagram}`}><img src={instagramLogo}/></a>}
                    {twitter && <a href={`${twitter}`}><img src={twitterLogo}/></a>}
                    {github && <a href={`${github}`}><img src={githubLogo}/></a>}
                    {(!facebook && !instagram && !github && !twitter) &&
                    (<div className={s.profile__contacts__nodata}>This User did not add any contact Information</div>)}
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo