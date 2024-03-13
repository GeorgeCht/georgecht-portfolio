'use client'

import { cn, debounce, useParallax } from '@/lib/utils'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import { motion as Motion, useInView, useScroll } from 'framer-motion'
import Image from 'next/image'

const AspectRatioImage = ({
  ratio = 1 / 1,
  responsiveRatio = 1 / 1,
  responsiveBreakpoint = 1280,
  src,
  alt = 'Image',
  direction = 'down',
  distance = 100,
  delay = 0,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  ratio?: number
  responsiveRatio?: number
  responsiveBreakpoint?: number
  alt?: string
  src: string | StaticImport
  direction?: 'up' | 'down'
  distance?: number
  delay?: number
  className?: string
}) => {
  const [calculatedRatio, setCalculatedRatio] = useState<number>(ratio)
  const [calculatedDistance, setCalculatedDistance] = useState<number>(distance)
  const targetRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapperRef, { once: true })

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
        style={{
          y,
          marginBlock: `-${calculatedDistance}px`,
          paddingBottom: `${Math.round((100 / calculatedRatio) * 100) / 100}%`,
        }}
        className={cn(className)}
      >
        <Image fill priority src={src} className={'object-cover'} alt={alt} />
      </Motion.div>
    </div>
  )
}

export default AspectRatioImage
