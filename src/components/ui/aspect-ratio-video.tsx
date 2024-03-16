'use client'

import { cn, debounce, useParallax } from '@/lib/utils'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import { motion as Motion, useInView, useScroll } from 'framer-motion'
import { useScrollVelocity } from '@/lib/hooks'

const AspectRatioVideo = ({
  ratio = 1 / 1,
  responsiveRatio = 1 / 1,
  responsiveBreakpoint = 1280,
  direction = 'down',
  distance = 100,
  delay = 0,
  src,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  ratio?: number
  responsiveRatio?: number
  responsiveBreakpoint?: number
  src: string
  direction?: 'up' | 'down'
  distance?: number
  delay?: number
  className?: string
}) => {
  const [calculatedRatio, setCalculatedRatio] = useState<number>(ratio)
  const [calculatedDistance, setCalculatedDistance] = useState<number>(distance)
  const [isDesktop, setIsDesktop] = useState(true)

  const targetRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapperRef, { once: true, margin: '20%' })

  const animation = {
    initial: { y: '0%' },
    enter: {
      y: '100%',
      transition: {
        duration: 1.675,
        ease: [1, 0, 0.01, 1],
        delay: delay,
      },
    },
    exit: {
      y: '100%',
      transition: {
        duration: 1,
        ease: [1, 0, 0.01, 1],
        delay: delay / 4,
      },
    },
  }

  useEffect(() => {
    setCalculatedRatio(
      window.innerWidth < responsiveBreakpoint && responsiveRatio !== undefined
        ? responsiveRatio
        : ratio,
    )
    setCalculatedDistance(window.innerWidth < 640 ? distance / 5 : distance)
    setIsDesktop(window.innerWidth > responsiveBreakpoint)

    const handleResize = () => {
      setCalculatedRatio(
        window.innerWidth < responsiveBreakpoint &&
          responsiveRatio !== undefined
          ? responsiveRatio
          : ratio,
      )
      setCalculatedDistance(window.innerWidth < 560 ? distance / 5 : distance)
    }

    window.addEventListener('resize', debounce(handleResize, 200))

    return () => {
      window.removeEventListener('resize', debounce(handleResize, 200))
    }
  }, [ratio, responsiveRatio, responsiveBreakpoint, distance])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })
  const y = useParallax(
    scrollYProgress,
    direction === 'down' ? calculatedDistance : calculatedDistance * -1,
  )

  const { calculatedValue: skewValue } = useScrollVelocity(-0.625, 0.625)
  const index = Math.floor(Math.random() * 10000) + 1

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full overflow-hidden', className)}
      {...props}
    >
      <Motion.div
        key={index}
        custom={index}
        className={'absolute w-full h-[110%] left-0 -top-1 bg-white z-[1]'}
        variants={animation}
        initial={'initial'}
        animate={isInView ? 'enter' : 'exit'}
        exit={'exit'}
      />
      <Motion.div
        ref={targetRef}
        className={cn(className)}
        style={{
          y,
          skew: isDesktop ? skewValue : 0,
          marginBlock: `-${calculatedDistance}px`,
          paddingBottom: `${Math.round((100 / calculatedRatio) * 100) / 100}%`,
        }}
      >
        <video
          className={
            'object-cover absolute top-0 left-0 w-full h-full pointer-events-none'
          }
          autoPlay
          muted
          loop
          controls={false}
          playsInline
          preload={'auto'}
          draggable={false}
        >
          <source
            src={src}
            type={'video/mp4'}
            className={'absolute pointer-events-none'}
          />
          Your browser does not support the video tag.
        </video>
      </Motion.div>
    </div>
  )
}

export default AspectRatioVideo
