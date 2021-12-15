import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import s from './../ProfileInfo.module.css'

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
        <div className={s.status}>
            {!editMode && (
                <div>
                    {props.isOwner ?
                        (<span onDoubleClick={activateEditMode}>
                            {props.status || 'NO STATUS'}
                        </span>) : (<span>
                            {props.status || 'NO STATUS'}
                        </span>)
                    }
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
