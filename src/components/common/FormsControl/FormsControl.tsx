import React from 'react'
import s from './FormsControl.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form'
import {ValidatorsType} from "../../../utils/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> =
    ({
         meta: {touched, error},
         children
     }) => {
        const hasErr = error && touched
        return (
            <div className={`${s.formControl} ${hasErr ? s.err : ''}`}>
                <div>{children}</div>
                {hasErr && <span>{error}</span>}
            </div>
        )
    }


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
}

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                          name: FormKeysType,
                                          component: React.FC<WrappedFieldProps>,
                                          validators: Array<ValidatorsType>,
                                          type: string | null,
                                          text = '',
                                          props = {}) {
    return (
        <div>
            <Field
                placeholder={placeholder}
                name={name}
                component={component}
                validate={validators}
                type={type}
                {...props}
            />
            {text}
        </div>
    )
}

export type getStringKeys<T> = Extract<keyof T, string>