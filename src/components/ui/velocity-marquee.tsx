'use client'

import { cn, lerp } from '@/lib/utils'
import React, { DetailedHTMLProps, HTMLAttributes, useRef } from 'react'

import {
  motion as Motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion'

const VelocityMarquee = ({
  children,
  className,
  direction = 1,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  direction?: number
}) => {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  })
  const skewVelocity = useSpring(scrollVelocity, {
    stiffness: 200,
    damping: 50,
  })

  const skewVelocityFactor = useTransform(
    skewVelocity,
    [-1000, 1000],
    [-3.275, 3.275],
  )

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * -1.725 * direction * (delta / 1500)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }
    if (velocityFactor.get() !== 0) {
      moveBy += directionFactor.current * moveBy * velocityFactor.get()
      baseX.set(baseX.get() + moveBy)
    }
  })

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })
  const x = useTransform(baseX, (v) => `${lerp(0, 1, v)}%`)
  const directionFactor = useRef<number>(1)

  return (
    <section
      className={cn(
        'flex whitespace-nowrap overflow-hidden w-screen',
        className,
      )}
      {...props}
    >
      <Motion.div
        className={cn('flex whitespace-nowrap w-[1000vw]')}
        style={{ x }}
      >
        {[...Array(1)].map((_, index) => (
          <Motion.span
            key={index}
            className={'flex flex-row gap-2 mr-8'}
            style={{ skew: skewVelocityFactor }}
          >
            {children}
          </Motion.span>
        ))}
      </Motion.div>
    </section>
  )
}

export default VelocityMarquee
