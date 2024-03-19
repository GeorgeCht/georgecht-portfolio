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
          top: -10,
          scale: 1.075,
        },
        enter: {
          opacity: 1,
          top: 0,
          scale: 1,
          transition: {
            duration: 0.475,
            ease: [1, 0.1, 0.1, 1],
          },
          transitionEnd: {
            opacity: 1,
            top: 0,
            scale: 1,
          },
        },
        exit: {
          opacity: 0,
          top: 10,
          scale: 1.175,
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
