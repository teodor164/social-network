import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/usersReducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/Selectors/usersSelectors";

const userSearchForms = (values: FormType) => {
    const errors = {};
    return errors;
}

type FriendFormType = 'true' | 'false' | 'null';
type FormType = {
    term: string,
    friend: FriendFormType
}
type UserSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UserSearchForm: React.FC<UserSearchFormPropsType> = ({onFilterChanged}) => {

    const filter = useSelector(getUsersFilter)

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
                enableReinitialize={true}
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
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