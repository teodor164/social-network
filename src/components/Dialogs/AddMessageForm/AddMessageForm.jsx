import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../../common/FormsControl/FormsControl'
import { maxLengthCreator, required } from '../../../utils/validators'

const maxLenght100 = maxLengthCreator(100)

const AddMessgeForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        name="newMessageBoddy"
        validate={[required, maxLenght100]}
      />
      <button>Send</button>
    </form>
  )
}

export default reduxForm({ form: 'dialogAddMessageForm' })(AddMessgeForm)
