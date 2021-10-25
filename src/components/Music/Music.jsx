import React from 'react'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
// import s from '/Music.module.css'

const Music = () => {
  return <div>Music</div>
}

let MusicContainer = withAuthRedirect(Music)

export default MusicContainer
