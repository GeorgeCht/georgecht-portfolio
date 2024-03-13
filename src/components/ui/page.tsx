'use client'

import { cn } from '@/lib/utils'
import { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react'

const Page = forwardRef<
  HTMLElement,
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
>(({ children, className, ...props }, ref) => {
  return (
    <article
      ref={ref}
      className={cn(
        'flex flex-col relative min-h-screen w-full overflow-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </article>
  )
})

Page.displayName = 'Page'
export default Page
