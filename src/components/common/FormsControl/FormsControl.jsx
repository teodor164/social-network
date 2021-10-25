import React from 'react'
import s from './FormsControl.module.css'
import { Field } from 'redux-form'

const FormControl = ({ input, meta, child, ...props }) => {
  const hasErr = meta.error && meta.touched
  return (
    <div className={`${s.formControl} ${hasErr ? s.err : ''}`}>
      <div>{props.children}</div>
      {hasErr && <span>{meta.error}</span>}
    </div>
  )
}

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  )
}

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  )
}

export const createField = (
  placeholder,
  name,
  component,
  validators,
  type,
  text = '',
  props = {}
) => {
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
