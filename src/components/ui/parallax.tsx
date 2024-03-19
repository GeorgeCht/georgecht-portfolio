'use client'

import { cn, debounce, useParallax } from '@/lib/utils'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { motion as Motion, Variants, useInView, useScroll } from 'framer-motion'
import { PrismicNextImage } from '@prismicio/next'
import { KeyTextField, ImageFieldImage } from '@prismicio/client'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { useScrollVelocity } from '@/lib/hooks'

import Image from 'next/image'

export interface ParallaxRootProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number
  responsiveRatio?: number
  responsiveBreakpoint?: number
  direction?: 'up' | 'down'
  distance?: number
  delay?: number
}

const ParallaxRoot = ({
  ratio = 1 / 1,
  responsiveRatio = 1 / 1,
  responsiveBreakpoint = 1280,
  direction = 'down',
  distance = 100,
  delay = 0,
  className,
  children,
  ...props
}: ParallaxRootProps) => {
  const [calculatedRatio, setCalculatedRatio] = useState<number>(ratio)
  const [calculatedDistance, setCalculatedDistance] = useState<number>(distance)
  const [isDesktop, setIsDesktop] = useState(true)

  const targetRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapperRef, { once: true })

  const motionVariants: Variants = {
    initial: { scale: '110%', maskSize: '100% 0%' },
    enter: {
      scale: '100%',
      maskSize: '100% 100%',
      transition: {
        duration: 1.275,
        ease: [1, 0.5, 0.5, 0.9],
        delay: delay * 1.1 + 0.275,
      },
    },
    exit: {
      scale: '110%',
      maskSize: '100% 0%',
      transition: {
        duration: 0.825,
        ease: [1, 0, 0.1, 1],
        delay: (delay * 1.1) / 10,
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

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full overflow-hidden', className)}
      {...props}
    >
      <Motion.div
        ref={targetRef}
        style={{
          y,
          skew: isDesktop ? skewValue : 0,
          marginBlock: `-${calculatedDistance}px`,
          paddingBottom: `${Math.round((100 / calculatedRatio) * 100) / 100}%`,
          maskImage: 'linear-gradient(to bottom, #000, #000)',
          maskRepeat: 'no-repeat',
        }}
        className={cn(className)}
        variants={motionVariants}
        initial={'initial'}
        animate={isInView ? 'enter' : 'exit'}
        exit={'exit'}
      >
        {children}
      </Motion.div>
    </div>
  )
}

export interface ParallaxVideoProps extends ParallaxRootProps {
  src: string | KeyTextField
}

const ParallaxVideo = ({ src, ...props }: ParallaxVideoProps) => {
  return (
    <ParallaxRoot {...props}>
      <video
        className={
          'object-cover absolute top-0 left-0 w-full h-full scale-100 hover:scale-[1.01] transition-transform ease-in-out will-change-transform duration-1000'
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
          src={`/cloud/assets/${src as string}`}
          type={'video/mp4'}
          className={'absolute pointer-events-none'}
        />
        Your browser does not support the video tag.
      </video>
    </ParallaxRoot>
  )
}

export interface ParallaxNextImageProps extends ParallaxRootProps {
  src: string | StaticImport
  alt: string
}

const ParallaxNextImage = ({ src, alt, ...props }: ParallaxNextImageProps) => {
  return (
    <ParallaxRoot {...props}>
      <Image
        fill
        priority
        src={src}
        className={
          'object-cover scale-100 hover:scale-[1.01] transition-transform ease-in-out will-change-transform duration-1000'
        }
        alt={alt}
      />
    </ParallaxRoot>
  )
}

export interface ParallaxPrismicImageProps extends ParallaxRootProps {
  image: ImageFieldImage | null | undefined
}

const ParallaxPrismicImage = ({
  image,
  ...props
}: ParallaxPrismicImageProps) => {
  return (
    <ParallaxRoot {...props}>
      <PrismicNextImage
        field={image}
        fill
        priority
        className={
          'object-cover scale-100 hover:scale-[1.01] transition-transform ease-in-out will-change-transform duration-1000'
        }
      />
    </ParallaxRoot>
  )
}

const Parallax = {
  Root: ParallaxRoot,
  Video: ParallaxVideo,
  Image: {
    Next: ParallaxNextImage,
    Prismic: ParallaxPrismicImage,
  },
}

export default Parallax
