import React, {FC} from 'react'
import s from './Dialogs.module.css'
import AddMessageForm from './AddMessageForm'
import {NavLink} from "react-router-dom";
import {DialogType, MessagesType} from "../../types/types";
import userPhoto from './../../assets/images/profile.png'


type PropsType = {
    dialogsData: Array<DialogType>
    messagesData: Array<MessagesType>
    addMessage: (text: string) => void
}
const Dialogs: FC<PropsType> = ({messagesData, dialogsData, addMessage}) => {
    let dialogsElement = dialogsData.map((d: DialogsPropsType) => (
        <DialogItem id={d.id} name={d.name} img={d.img} key={d.id}/>
    ))

    let messagesElements = messagesData.map((m: { message: string }) => (
        <div className={s.message}>{m.message}</div>
    ))

    let sendMessage = (value: NewMessageFormType) => {
        addMessage(value.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElement}</div>
            <div className={s.messages}>
                {messagesElements}
                <div className={s.addBlock}>
                    <AddMessageForm onSubmit={sendMessage}/>
                </div>
            </div>
        </div>
    )
}

type DialogsPropsType = {
    id: number
    img: string
    name: string
}
const DialogItem: FC<DialogsPropsType> = ({id, img, name}) => {
    return (
        <div className={s.dialog}>
            <NavLink to={`/dialogs/${id}`} activeClassName={s.activeLink}>
                <div className={s.item}>
                    <img src={img} alt={userPhoto}/>
                    <div className={s.name}>{name}</div>
                </div>
            </NavLink>
        </div>
    )
}

export default Dialogs

export type NewMessageFormType = {
    newMessageBody: string
}