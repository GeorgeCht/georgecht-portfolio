'use client'

import { useInView, motion as Motion } from 'framer-motion'
import { ElementType, forwardRef, useRef } from 'react'
import { cn } from '@/lib/utils'

const TextRevealFlip = forwardRef(
  (
    {
      as,
      text,
      delay = 0,
      enterY = '20%',
      lineHeight = '1em',
      typeClass = 'type-base',
      wrapperClass,
      className,
      ...props
    }: {
      text: string
      delay?: number
      enterY?: string
      lineHeight?: string
      typeClass?: string
      wrapperClass?: string
      className?: string
    } & AsProp<'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span'>,
    ref: React.ForwardedRef<HTMLSpanElement>,
  ) => {
    const ANIMATION_SPEED = 0.0925
    const BUILT_IN_DELAY = 0.0925

    const Element: ElementType = as || 'p'

    const wrapperRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(wrapperRef, { once: true })

    const animation = {
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
      <div
        className={cn(
          'group relative inline-block overflow-hidden leading-[1em] cursor-pointer w-fit h-fit',
          wrapperClass,
        )}
        ref={wrapperRef}
      >
        <Element
          data-text={text}
          className={cn(
            'inline-block relative z-[1] duration-[1.175s] will-change-transform',
            'ease-[cubic-bezier(0.15,1,0.15,1)] transition-transform',
            'after:content-[attr(data-text)] after:block after:absolute after:skew-y-[4deg]',
            'after:origin-[left_top] after:duration-[2s] after:transition-transform',
            'after:ease-[cubic-bezier(0.19,1,0.22,1)] after:mt-0 after:top-full',
            'md:group-hover:translate-y-[-100%] md:after:group-hover:skew-y-0',
            className,
          )}
          {...props}
        >
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
                variants={animation}
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

TextRevealFlip.displayName = 'TextRevealFlip'

export default TextRevealFlip
