import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/usersReducer";

const userSearchForms = (values: FormType) => {
    const errors = {};
    return errors;
}

type FormType = {
    term: string,
    friend: 'true' | 'false' | 'null'
}
type UserSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UserSearchForm: React.FC<UserSearchFormPropsType> = ({onFilterChanged}) => {

    const submit = (values: FormType) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null
                : values.friend === 'true' ? true : false
        }
        onFilterChanged(filter)

    }

    return (
        <div>
            <Formik
                initialValues={{term: '', friend: 'null'}}
                validate={userSearchForms}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field as="select" name="friend">
                            <option value="null">All</option>
                            <option value="true">Only Followed</option>
                            <option value="false">Only Unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UserSearchForm