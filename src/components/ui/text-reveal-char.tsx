'use client'

import { useInView, motion as Motion } from 'framer-motion'
import { ElementType, forwardRef, useRef } from 'react'
import { cn } from '@/lib/utils'

const TextRevealByChar = forwardRef(
  (
    {
      as,
      text,
      id,
      delay = 0,
      enterY = '20%',
      lineHeight = '1em',
      typeClass = 'type-base',
      animateY = true,
      className,
      ...props
    }: {
      text: string
      delay?: number
      id?: string
      enterY?: string
      animateY?: boolean
      lineHeight?: string
      typeClass?: string
      className?: string
    } & AsProp<'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span'>,
    ref: React.ForwardedRef<HTMLSpanElement>,
  ) => {
    const ANIMATION_SPEED = 0.0425

    const Element: ElementType = as || 'p'

    const wrapperRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(wrapperRef, { once: true })

    const animation = {
      initial: { opacity: 0, y: '0%' },
      enter: (iteration: number) => ({
        opacity: 1,
        y: animateY ? enterY : '0%',
        transition: {
          duration: 1.175,
          ease: [1, 0, 0.01, 1],
          delay: ANIMATION_SPEED * iteration + delay,
        },
      }),
      exit: (iteration: number) => ({
        opacity: 0,
        y: animateY ? '100%' : '0%',
        transition: {
          duration: 1,
          ease: [1, 0, 0.01, 1],
          delay: (ANIMATION_SPEED * iteration + delay) / 4,
        },
      }),
    }

    // split text for each word
    const chars = text.split('')
    return (
      <div className={'relative'} ref={wrapperRef} id={id}>
        <Element
          className={cn('relative overflow-hidden flex flex-row', className)}
          {...props}
        >
          {chars.map((char, index) => (
            <span
              key={index}
              style={{ height: lineHeight }}
              aria-describedby={'word'}
              className={cn('relative flex mt-[-0.25em]', typeClass)}
            >
              <Motion.span
                ref={ref}
                key={index}
                custom={index}
                variants={animation}
                initial={'initial'}
                className={
                  'block ml-[-1.75rem] pl-[0.15rem] pr-[1.75rem] w-fit'
                }
                animate={isInView ? 'enter' : 'exit'}
                exit={'exit'}
              >
                {char}
              </Motion.span>
            </span>
          ))}
        </Element>
      </div>
    )
  },
)

TextRevealByChar.displayName = 'TextRevealByChar'

export default TextRevealByChar
