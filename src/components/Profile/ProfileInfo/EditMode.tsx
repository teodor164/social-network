import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, getStringKeys, MyInput} from '../../common/FormsControl/FormsControl'
import {ProfileType} from "../../../types/types";
import s from './ProfileInfo.module.css'
import {Button} from "antd";

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
        <>
            <EditModeFormRedux
                submit={submit}
                profile={profile}
                initialValues={profile}
                onSubmit={submitForm}
            />
        </>
    )
}


const EditModeForm: React.FC<InjectedFormProps<ProfileType, ProfileFormOwnPropsType> & ProfileFormOwnPropsType> =
    ({handleSubmit, submit}) => {
        return (
            <form onSubmit={handleSubmit} className={`${s.profile__info__container}`}>
                <div className={`${s.profile__contacts__container}`}>
                    Full Name:
                    {createField<ProfileFormValuesKeyType>('Full Name', 'fullName', MyInput, [], null)}
                    About me:
                    {createField<ProfileFormValuesKeyType>('About me', 'aboutMe', MyInput, [], null)}
                    Job status:
                    {createField<ProfileFormValuesKeyType>('Job status', 'lookingForAJobDescription', MyInput, [], null)}
                </div>
                <div className={`${s.profile__contacts__container}`}>
                    Facebook:
                    {createField('Your facebook profile', `contacts.facebook`, MyInput, [], null)}
                    Instagram:
                    {createField('Your instagram profile', `contacts.instagram`, MyInput, [], null)}
                    Twitter:
                    {createField('Your twitter profile', `contacts.twitter`, MyInput, [], null)}
                    Github:
                    {createField('Your github profile', `contacts.github`, MyInput, [], null)}
                </div>
                <div className={`${s.profile__contacts__container}`}>
                    <Button onClick={() => {
                        submit('profileForm')
                    }} type={'primary'} block>Save Data</Button>
                </div>
            </form>
        )
    }

const EditModeFormRedux = reduxForm<ProfileType, ProfileFormOwnPropsType>({
    form: 'profileForm',
})(EditModeForm)

export default EditMode


type ProfileFormOwnPropsType = {
    profile: ProfileType
    submit: any
}
type ProfileFormValuesKeyType = getStringKeys<ProfileType>