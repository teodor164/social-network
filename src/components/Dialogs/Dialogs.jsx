import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import AddMessgeForm from './AddMessageForm/AddMessageForm'

const Dialogs = (props) => {
  let dialogsElement = props.dialogsPage.dialogsData.map((d) => (
    <DialogItem id={d.id} name={d.name} img={d.img} key={d.id} />
  ))

  let messagesElements = props.dialogsPage.messagesData.map((m) => (
    <Message message={m.message} key={m.id} />
  ))

  let sendMessage = (value) => {
    props.addMessgeBtt(value.newMessageBoddy)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElement}</div>
      <div className={s.messages}>
        {messagesElements}
        <div className={s.addBlock}>
          <AddMessgeForm onSubmit={sendMessage} />
        </div>
      </div>
    </div>
  )
}

export default Dialogs
