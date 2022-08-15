import React from 'react'
import s from './FormsControl.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form'
import {ValidatorsType} from "../../../utils/validators";
import {Input} from "antd";
import TextArea from "antd/es/input/TextArea";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({
         meta: {touched, error},
         children
     }) => {

        const hasErr = error && touched

        return <div className={`${s.formControl} ${hasErr ? s.err : ''}`}>
                {children}
                {hasErr && <span>{error}</span>}
            </div>
    }


export const MyTextarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <TextArea {...input} {...restProps} />
        </FormControl>
    )
}

export const MyInput: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <Input {...input} {...restProps} />
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
        <>
            <Field
                placeholder={placeholder}
                name={name}
                component={component}
                validate={validators}
                type={type}
                {...props}
            />
            {text}
        </>
    )
}

export type getStringKeys<T> = Extract<keyof T, string>