import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators'
import { Textarea } from '../../common/FormsControl/FormsControl'
const maxLength70 = maxLengthCreator(70)

const MyPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="postText" component={Textarea} validate={maxLength70} />
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
}

const MyPostReduxForm = reduxForm({
  form: 'login',
})(MyPostForm)

const PostsForm = (props) => {
  const onSubmit = (formData) => {
    props.addPostBtt(formData.postText)
  }

  return (
    <div>
      <MyPostReduxForm onSubmit={onSubmit} />
    </div>
  )
}

export default PostsForm
