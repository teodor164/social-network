import React from 'react'
import s from './../ProfileInfo.module.css'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, getStringKeys, Input} from '../../../common/FormsControl/FormsControl'
import {ProfileType} from "../../../../types/types";

type EditModeType = {
    profile: ProfileType
    submit: (formName: string) => void
    saveData: (formData: ProfileType) => void
}
const EditMode: React.FC<EditModeType> = ({profile, submit, saveData}) => {

    const submitForm = (formData: ProfileType) => {
        saveData(formData)
    }

    return (
        <div className={s.a0001}>
            <div
                className={s.edit}
                onClick={() => {
                    submit('profileForm')
                }}
            >
                Submit
            </div>
            <EditModeFormRedux
                profile={profile}
                initialValues={profile}
                onSubmit={submitForm}
            />
        </div>
    )
}


const EditModeForm: React.FC<InjectedFormProps<ProfileType, ProfileFormOwnPropsType> & ProfileFormOwnPropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit} className={s.infoBlock}>
            {/* InfoBlock */}
            <div className={s.infoBox}>
                Info
                <div className={s.infoBoxItem}>
                    <span className={s.key}>Full Name: </span>
                    {createField<ProfileFormValuesKeyType>('Full Name', 'fullName', Input, [], null)}
                </div>
                <div className={s.infoBoxItem}>
                    <span className={s.key}>About me: </span>
                    {createField<ProfileFormValuesKeyType>('About me', 'aboutMe', Input, [], null)}
                </div>
                <div className={s.infoBoxItem}>
                    <span className={s.key}>Is Looking For Job: </span>
                    {createField<ProfileFormValuesKeyType>(undefined, 'lookingForAJob', Input, [], 'checkBox')}
                </div>
                <div className={s.infoBoxItem}>
                    <span className={s.key}>Job status: </span>
                    {createField<ProfileFormValuesKeyType>(
                        'Job status',
                        'lookingForAJobDescription',
                        Input,
                        [],
                        null
                    )}
                </div>
            </div>
            {/* InfoBlock */}
            {/* ContactsBlock */}
            <div className={s.infoBox}>
                Contacts
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <div className={s.contactBoxItem}>
                            <span className={s.key}>{key}: </span>
                            <span className={s.property}>
                {createField(undefined, `contacts.${key}`, Input, [], null)}
              </span>
                            {error && <div className={s.formSummaryError}>{error}</div>}
                        </div>
                    )
                })}
            </div>
            {/* ContactsBlock */}
        </form>
    )
}

const EditModeFormRedux = reduxForm<ProfileType, ProfileFormOwnPropsType>({
    form: 'profileForm',
})(EditModeForm)

export default EditMode


type ProfileFormOwnPropsType = {
    profile: ProfileType
}
type ProfileFormValuesKeyType = getStringKeys<ProfileType>