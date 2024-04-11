'use client'

import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { HTMLMotionProps, motion as Motion, Variants } from 'framer-motion'

const anim = (variants: Variants) => {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  }
}

const TransitionPane: ForwardRefRenderFunction<
  HTMLDivElement,
  HTMLMotionProps<'div'>
> = ({ children, ...props }, ref) => {
  return (
    <Motion.div
      ref={ref}
      className={'realtive w-full h-full'}
      {...anim({
        initial: {
          opacity: 0,
          top: -5,
        },
        enter: {
          opacity: 1,
          top: 0,
          transition: {
            duration: 0.475,
            ease: [1, 0.1, 0.1, 1],
          },
          transitionEnd: {
            opacity: 1,
            top: 0,
          },
        },
        exit: {
          opacity: 0,
          top: 5,
          transition: { duration: 0.625, ease: [1, 0.1, 0.1, 1] },
        },
      })}
      {...props}
    >
      {children}
    </Motion.div>
  )
}

TransitionPane.displayName = 'TransitionPane'
export default forwardRef(TransitionPane)
