'use client'

import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { HTMLMotionProps, motion as Motion, MotionProps } from 'framer-motion'

const anim = (variants: MotionProps['variants']) => {
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
          top: -25,
          scale: 0.975,
        },
        enter: {
          opacity: 1,
          top: 0,
          scale: 1,
          transition: {
            duration: 0.475,
            ease: [1, 0, 0.01, 1],
          },
          transitionEnd: {
            opacity: 1,
            top: 0,
            scale: 1,
          },
        },
        exit: {
          opacity: 0,
          top: -25,
          scale: 0.975,
          transition: { duration: 0.825, ease: [1, 0, 0.01, 1] },
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
