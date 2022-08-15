import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import s from './ProfileHeader.module.css'
import {Input} from "antd";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}
const ProfileStatus: FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    let activateEditMode = () => {
        setEditMode(true)
    }

    let deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <div className={s.profile__status}>
            {!editMode && (
                <div>
                    {props.isOwner ?
                        (<a onClick={activateEditMode}>
                            {props.status || 'Set Status'}
                        </a>) : (<span>
                            {props.status || `This user did not set his status`}
                        </span>)
                    }
                </div>
            )}
            {editMode && (
                <div>
                    <Input
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
