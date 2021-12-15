import React, {ComponentType, Suspense} from 'react'
import Preloader from '../components/common/Preloader/Preloader'

export function LazyLoading<WCP>(WrappedComponent: ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <>
        <Suspense fallback={<Preloader />}>
          <WrappedComponent {...props} />
        </Suspense>
      </>
    )
  }
}

export default LazyLoading
