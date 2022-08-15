import React, {useEffect, useRef, useState} from "react";
import style from './Chat.module.css'
import {useDispatch, useSelector} from "react-redux";
import {sendChatMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";
import {AppStateType} from "../../redux/reduxStore";
import {Button} from "antd";
import TextArea from "antd/es/input/TextArea";
import profilePhoto from "../../assets/images/profile.png";


const ChatPage: React.FC = () => {
    return <div className={style.chat__page__block}>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <>
        {status === 'error' && <div>Some error occurred.Please refresh page.</div>}
        <>
            <Messages/>
            <AddMessageForm/>
        </>
    </>
}

const Messages: React.FC = () => {

    const [isAutoScroll, setAutoScroll] = useState<boolean>(true)
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setAutoScroll(true)
        } else {
            isAutoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return <div className={style.messagesContainer} onScroll={scrollHandler}>

        {messages.map((m) =>
            <Message
                key={m.id}
                photo={m.photo}
                userName={m.userName}
                message={m.message}
            />)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

type MessageType = {
    photo: string,
    userName: string,
    message: string
}
const Message: React.FC<MessageType> = React.memo(({photo, userName, message}) => {
    return <div className={style.messageBlock}>
        <label className={style.avatar__container}>
            <img src={photo || profilePhoto}/>
        </label>
        <div>
            <div className={style.user__name}>{userName}</div>
            <div className={style.text__message}>{message}</div>
        </div>
    </div>
})

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chat.status)

    const dispatch = useDispatch()

    const sendMessage = () => {
        if (!message) return
        dispatch(sendChatMessage(message))
        setMessage('')
    }

    return <div className={style.add__message__form__container}>
        <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        <div className={style.button__container}>
            <Button onClick={sendMessage} disabled={status !== 'ready'}>send</Button>
        </div>
    </div>
}

export default ChatPage