import React, { useEffect, useState } from 'react'
import s from './../ProfileInfo.module.css'

const ProfileStatus = (props) => {
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  let activateEditMode = () => {
    setEditMode(true)
  }

  let deActivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  return (
    <div className={s.status}>
      {!editMode && (
        <div>
          <span onDoubleClick={props.isOwner && activateEditMode}>
            {props.status || 'NO STATUS'}
          </span>
        </div>
      )}

      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deActivateEditMode}
            value={status}
          />
        </div>
      )}
    </div>
  )
}

export default ProfileStatus
