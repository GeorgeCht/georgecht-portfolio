'use client'
import { cn, lerp } from '@/lib/utils'
import { HTMLMotionProps, motion as Motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface MouseEvent {
  movementY: number
  clientX: number
}

const BezierCurve = ({
  className,
  pathClassName,
  index = 0,
  ...props
}: HTMLMotionProps<'div'> & {
  pathClassName?: string
  index?: number
}) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const path = useRef<SVGPathElement>(null)
  const isInView = useInView(wrapper, { once: true })

  const animation = {
    initial: { width: '0%' },
    enter: {
      width: '100%',
      transition: {
        duration: 1.625,
        delay: index * 0.125,
        ease: [1, 0, 0.01, 1],
      },
    },
    exit: {
      width: '0%',
      transition: { duration: 0.725 / 2, ease: [1, 0, 0.01, 1] },
    },
  }

  let progress = 0
  let x = 0.5
  let time = Math.PI / 2
  let reqId: number | null = null

  useEffect(() => {
    const handleResize = () => setPath(progress)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setPath = (progress: number) => {
    const width = window.innerWidth * 1
    path.current?.setAttributeNS(
      null,
      'd',
      `M0 40 Q${width * x} ${40 + progress}, ${width} 40`,
    )
  }

  const handleOnEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId)
      resetAnimation()
    }
  }

  const handleOnMove = (e: MouseEvent) => {
    const { movementY, clientX } = e
    const pathBound = path.current?.getBoundingClientRect()
    if (pathBound) {
      x = (clientX - pathBound.left) / pathBound.width
      progress += movementY
      setPath(progress)
    }
  }

  const handleOnLeave = () => {
    animateOut()
  }

  const animateOut = () => {
    const newProgress = progress * Math.sin(time)
    progress = lerp(progress, 0, 0.0275)
    time += 0.185
    setPath(newProgress)
    if (Math.abs(progress) > 0.99) {
      reqId = requestAnimationFrame(animateOut)
    } else {
      resetAnimation()
    }
  }

  const resetAnimation = () => {
    time = Math.PI / 2
    progress = 0
  }

  return (
    <div ref={wrapper}>
      <Motion.div
        className={cn('relative h-px', className)}
        variants={animation}
        initial={'initial'}
        animate={isInView ? 'enter' : 'exit'}
        exit={'exit'}
        {...props}
      >
        <div
          onMouseEnter={() => handleOnEnter()}
          onMouseMove={(e) => handleOnMove(e)}
          onMouseLeave={() => handleOnLeave()}
          className={'relative z-10 h-10 w-full top-[-40px]'}
        />
        <svg className={'absolute w-full h-[65px] top-[-40px]'}>
          <path
            ref={path}
            className={cn(
              'stroke-current w-full text-black stroke-[1px] fill-none',
              pathClassName,
            )}
          />
        </svg>
      </Motion.div>
    </div>
  )
}

export default BezierCurve
