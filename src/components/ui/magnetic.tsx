'use client'

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { HTMLMotionProps, motion as Motion } from 'framer-motion'

const Magnetic = ({
  children,
  stiffness = 300,
  damping = 15,
  mass = 0.2,
  ...props
}: HTMLMotionProps<'div'> & {
  stiffness?: number
  damping?: number
  mass?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const handleMouse: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const { clientX, clientY } = event
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX, y: middleY })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position
  return windowSize.width >= 560 ? (
    <Motion.div
      style={{ position: 'relative' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{
        type: 'spring',
        stiffness: stiffness,
        damping: damping,
        mass: mass,
      }}
      {...props}
    >
      {children}
    </Motion.div>
  ) : (
    <React.Fragment>
      <div className={'relative'}>{children as ReactNode}</div>
    </React.Fragment>
  )
}

export default Magnetic
