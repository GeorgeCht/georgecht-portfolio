'use client'

import { cn } from '@/lib/utils'
import React, { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react'

const Marquee = forwardRef<
  HTMLElement,
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
    text?: string
  }
>(({ children, text, className, ...props }, ref) => {
  const duration = (text?.length ?? 15) * 4.175
  return (
    <section
      ref={ref}
      // @ts-expect-error string literal as css property
      style={{ '--duration': `${duration}s` }}
      className={cn('flex relative w-max animate-marquee', className)}
      {...props}
    >
      {[...Array(2)].map((_, index) => (
        <div key={index} className={'h-full px-1'}>
          {children}
        </div>
      ))}
    </section>
  )
})

Marquee.displayName = 'Marquee'
export default Marquee
