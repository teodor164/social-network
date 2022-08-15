import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {maxLengthCreator} from '../../../utils/validators'
import {createField, getStringKeys, MyTextarea} from '../../common/FormsControl/FormsControl'

const maxLength70 = maxLengthCreator(70)

const MyPostForm: React.FC<InjectedFormProps<NewPostFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NewPostKeysType>('New Post Text', 'postText', MyTextarea, [maxLength70], null)}
            <button>Add Post</button>
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

    return <>
        <MyPostReduxForm onSubmit={onSubmit}/>
    </>

}

export default PostsForm

type PropsType = {}
type NewPostFormType = {
    postText: string
}
type NewPostKeysType = getStringKeys<NewPostFormType>