'use client'

import { cn } from '@/lib/utils'
import React, { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react'

// TODO: https://codesandbox.io/p/sandbox/framer-motion-marquee-cxlm5e

const Marquee = forwardRef<
  HTMLElement,
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
>(({ children, className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        'flex relative w-max animate-marquee [--duration:60s]',
        className,
      )}
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
