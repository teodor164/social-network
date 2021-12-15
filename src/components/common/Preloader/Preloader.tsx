import React from 'react'
import s from './Preloader.module.css'

let Preloader = () => {
  return (
    <img
      className={s.loader}
      src={'https://samherbert.net/svg-loaders/svg-loaders/puff.svg'}
    />
  )
}

export default Preloader
