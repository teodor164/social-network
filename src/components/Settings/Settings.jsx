import React from 'react'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
// import s from '/Settings.module.css'

const Settings = () => {
  return <div>Settings</div>
}

let SettingsContainer = withAuthRedirect(Settings)

export default SettingsContainer
