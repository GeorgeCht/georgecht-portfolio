'use client'

import { cn, debounce, useParallax } from '@/lib/utils'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { MainContainerContext } from '@/components/layout/main'
import { motion as Motion, useScroll } from 'framer-motion'

const AspectRatioVideo = ({
  ratio = 1 / 1,
  responsiveRatio,
  responsiveBreakpoint = 1080,
  direction = 'down',
  distance = 100,
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
  className?: string
}) => {
  const [calculatedRatio, setCalculatedRatio] = useState<number>(ratio)
  const [calculatedDistance, setCalculatedDistance] = useState<number>(distance)
  const targetRef = useRef<HTMLDivElement>(null)

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

  const mainContainer = useContext(MainContainerContext)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: mainContainer!,
    offset: ['start end', 'end start'],
  })
  const y = useParallax(
    scrollYProgress,
    direction === 'down' ? calculatedDistance : calculatedDistance * -1,
  )

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      {...props}
    >
      <Motion.div
        ref={targetRef}
        className={cn(className)}
        style={{
          y,
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
