import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {maxLengthCreator} from '../../../utils/validators'
import {createField, getStringKeys, Textarea} from '../../common/FormsControl/FormsControl'

const maxLength70 = maxLengthCreator(70)

const MyPostForm: React.FC<InjectedFormProps<NewPostFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewPostKeysType>('New Post Text', 'postText', Textarea, [maxLength70], null)}
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const MyPostReduxForm = reduxForm<NewPostFormType, PropsType>({
    form: 'login',
})(MyPostForm)

type PostsFormType = {
    addPost: (postText: string) => void
}
const PostsForm: React.FC<PostsFormType> = (props) => {

    const onSubmit = (formData: NewPostFormType) => {
        props.addPost(formData.postText)
    }

    return (
        <div>
            <MyPostReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default PostsForm

type PropsType = {}
type NewPostFormType = {
    postText: string
}
type NewPostKeysType = getStringKeys<NewPostFormType>