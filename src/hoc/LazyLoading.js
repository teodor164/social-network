import React, { Suspense } from 'react'
import Preloader from '../components/common/Preloader/Preloader'

export const LazyLoading = (Component) => {
  return (props) => {
    return (
      <>
        <Suspense fallback={<Preloader />}>
          <Component {...props} />
        </Suspense>
      </>
    )
  }
}

export default LazyLoading
