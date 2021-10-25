import React from 'react'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
// import s from '/News.module.css'

const News = () => {
  return <div>News</div>
}

let NewsContainer = withAuthRedirect(News)

export default NewsContainer
