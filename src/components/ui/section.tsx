'use client'

import { cn } from '@/lib/utils'
import { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react'

const Section = forwardRef<
  HTMLElement,
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
    withPadding?: boolean
    withGap?: boolean
  }
>(
  (
    { children, className, withPadding = true, withGap = false, ...props },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          'flex flex-col relative overflow-hidden',
          withPadding && 'px-2',
          withGap && 'gap-1 sm:gap-2.5',
          className,
        )}
        {...props}
      >
        {children}
      </section>
    )
  },
)

Section.displayName = 'Section'
export default Section
