'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/router'
import { forwardRef, ButtonHTMLAttributes, useRef } from 'react'
import type { UrlObject } from 'url'
import { useInView, motion as Motion, HTMLMotionProps } from 'framer-motion'
import Magnetic from '@/components/ui/magnetic'

type Url = string | UrlObject
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: Url | undefined
  variant?: 'primary' | 'outline'
  delay?: number
}

const Button = forwardRef<
  HTMLButtonElement,
  HTMLMotionProps<'button'> & ButtonProps
>(
  (
    {
      children,
      className,
      onClick,
      variant = 'primary',
      href = undefined,
      delay = 0,
      ...props
    },
    ref,
  ) => {
    const router = useRouter()
    const handleClick = () => href && router.push(href)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(wrapperRef, { once: true })
    const BUILT_IN_DELAY = 0.0925
    const animation = {
      initial: { opacity: 0 },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.875,
          ease: [1, 0, 0.01, 1],
          delay: delay + BUILT_IN_DELAY,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.875,
          ease: [1, 0, 0.01, 1],
          delay: delay + BUILT_IN_DELAY / 4,
        },
      },
    }

    return (
      <div ref={wrapperRef}>
        <Magnetic>
          <Motion.button
            type={'button'}
            ref={ref}
            className={cn(
              variant === 'primary'
                ? 'text-[#EAF1F8] bg-[#0A0A0A]'
                : 'text-[#0A0A0A] bg-transparent',
              'border border-[#0A0A0A] rounded-full type-mono-sm px-6 pt-3 pb-2',
              className,
            )}
            variants={animation}
            initial={'initial'}
            animate={isInView ? 'enter' : 'exit'}
            exit={'exit'}
            onClick={onClick || handleClick}
            {...props}
          >
            {children}
          </Motion.button>
        </Magnetic>
      </div>
    )
  },
)

Button.displayName = 'Button'
export default Button
