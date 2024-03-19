'use client'

import { useInView, motion as Motion, Variants } from 'framer-motion'
import { ElementType, forwardRef, useRef } from 'react'
import { cn } from '@/lib/utils'

const TextReveal = forwardRef(
  (
    {
      as,
      text,
      delay = 0,
      enterY = '20%',
      lineHeight = '1em',
      typeClass = 'type-base',
      className,
      ...props
    }: {
      text: string
      delay?: number
      enterY?: string
      lineHeight?: string
      typeClass?: string
      className?: string
    } & AsProp<'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span'>,
    ref: React.ForwardedRef<HTMLSpanElement>,
  ) => {
    const ANIMATION_SPEED = 0.0925
    const BUILT_IN_DELAY = 0.0925

    const Element: ElementType = as || 'p'

    const wrapperRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(wrapperRef, { once: true })

    const variants: Variants = {
      initial: { y: '190%', skewY: '8deg' },
      enter: (iteration: number) => ({
        y: enterY,
        skewY: '0',
        transition: {
          duration: 1.875,
          ease: [1, 0, 0.01, 1],
          delay: ANIMATION_SPEED * iteration + delay,
        },
      }),
      exit: (iteration: number) => ({
        y: '190%',
        skewY: '8deg',
        transition: {
          type: 'spring',
          stiffness: 275,
          damping: 30,
          delay: (ANIMATION_SPEED * iteration + delay + BUILT_IN_DELAY) / 4,
        },
      }),
    }

    // split text for each word
    const words = text.split(' ')
    return (
      <div className={'relative w-fit'} ref={wrapperRef}>
        <Element className={cn('relative block', className)} {...props}>
          {words.map((word, index) => (
            <span
              key={index}
              style={{ height: lineHeight }}
              aria-describedby={'word'}
              className={cn(
                'inline-block overflow-hidden mr-1.5 mt-[-0.25em]',
                typeClass,
              )}
            >
              <Motion.span
                ref={ref}
                key={index}
                custom={index}
                variants={variants}
                initial={'initial'}
                className={'inline-block'}
                animate={isInView ? 'enter' : 'exit'}
                exit={'exit'}
              >
                {word}
              </Motion.span>
            </span>
          ))}
        </Element>
      </div>
    )
  },
)

TextReveal.displayName = 'TextReveal'

export default TextReveal
