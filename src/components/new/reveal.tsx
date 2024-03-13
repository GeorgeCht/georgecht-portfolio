import { useEffect, useRef, useState } from 'react'
import { useInView, motion as Motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

const Reveal = ({
  children,
  childrenRef,
  className,
  delay = 0,
  duration = 1.875,
  opacity = false,
  height,
  y = true,
  ...props
}: HTMLMotionProps<'span'> & {
  delay?: number
  height?: number
  duration?: number
  opacity?: boolean
  y?: boolean
  childrenRef?: React.RefObject<unknown> | null
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [childrenHeight, setChildrenHeight] = useState(
    height !== undefined ? height : 0,
  )
  const isInView = useInView(wrapperRef, { once: true })
  const animation = {
    initial: {
      ...(opacity ? { opacity: 0 } : {}),
      ...(y ? { y: '100%' } : {}),
    },
    enter: {
      ...(y ? { y: '0%' } : {}),
      ...(opacity ? { opacity: 1 } : {}),
      transition: {
        duration: duration,
        ease: [1, 0, 0.01, 1],
        delay: delay,
      },
    },
    exit: {
      ...(opacity ? { opacity: 0 } : {}),
      ...(y ? { y: '100%' } : {}),
      transition: {
        type: 'spring',
        stiffness: 275,
        damping: 30,
        delay: delay / 4,
      },
    },
  }

  // TODO: Fix resize event

  useEffect(() => {
    if (childrenRef !== null && childrenRef !== undefined) {
      // @ts-expect-error childrenRef always contains clientHeight
      setChildrenHeight(childrenRef.current?.clientHeight || 0)
    }
  }, [childrenRef])

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full h-full', y && 'overflow-hidden')}
      style={{
        height:
          y && childrenRef !== null && childrenRef !== undefined
            ? childrenHeight
            : `${height}px`,
      }}
    >
      <Motion.span
        variants={animation}
        initial={'initial'}
        animate={isInView ? 'enter' : 'exit'}
        exit={'exit'}
        className={cn('absolute top-0 left-0 h-full', className)}
        {...props}
      >
        {children}
      </Motion.span>
    </div>
  )
}

export default Reveal
