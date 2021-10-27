import React from 'react'
import s from './../ProfileInfo.module.css'
import { reduxForm } from 'redux-form'
import { createField, Input } from '../../../common/FormsControl/FormsControl'

const EditeMode = ({ profile, submit, saveData }) => {
  const submitForm = (formData) => {
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
      <EditeModeFormRedux
        profile={profile}
        initialValues={profile}
        onSubmit={submitForm}
      />
    </div>
  )
}

const EditeModeForm = ({ handleSubmit, profile }) => {
  return (
    <form onSubmit={handleSubmit} className={s.infoBlock}>
      {/* InfoBlock */}
      <div className={s.infoBox}>
        Info
        <div className={s.infoBoxItem}>
          <span className={s.key}>Full Name: </span>
          {createField('Full Name', 'fullName', Input, [], null)}
        </div>
        <div className={s.infoBoxItem}>
          <span className={s.key}>About me: </span>
          {createField('About me', 'aboutMe', Input, [], null)}
        </div>
        <div className={s.infoBoxItem}>
          <span className={s.key}>Is Looking For Job: </span>
          {createField(null, 'lookingForAJob', Input, [], 'checkBox')}
        </div>
        <div className={s.infoBoxItem}>
          <span className={s.key}>Job status: </span>
          {createField(
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
                {createField(null, `contacts.${key}`, Input, [], null)}
              </span>
              {/* {error && <div className={s.formSummaryError}>{error}</div>} */}
            </div>
          )
        })}
      </div>
      {/* ContactsBlock */}
    </form>
  )
}

const EditeModeFormRedux = reduxForm({
  form: 'profileForm',
})(EditeModeForm)

export default EditeMode
