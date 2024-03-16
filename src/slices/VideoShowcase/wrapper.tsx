import React from 'react'
import { Content } from '@prismicio/client'

const Wrapper = ({
  children,
  slice,
}: {
  children: React.ReactNode
  slice: Content.VideoShowcaseSlice
}) => {
  return (
    <React.Fragment>
      {slice.variation !== 'halfmid' ? (
        <React.Fragment>
          <div className={'md:w-1/2 w-full'}>
            {slice.variation === 'halfleft' ? children : null}
          </div>
          <div className={'md:w-1/2 w-full'}>
            {slice.variation === 'halfright' ? children : null}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={'w-1/6 hidden lg:flex'} />
          <div className={'md:w-1/2 w-full'}>{children}</div>
          <div className={'w-4/12 hidden lg:flex'} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Wrapper
