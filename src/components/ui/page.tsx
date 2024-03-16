'use client'

import { cn } from '@/lib/utils'
import React, { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react'
import { Toaster } from 'sonner'

const Page = forwardRef<
  HTMLElement,
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
>(({ children, className, ...props }, ref) => {
  return (
    <React.Fragment>
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
      <Toaster
        style={{ font: 'inherit' }}
        toastOptions={{
          classNames: {
            toast: '!shadow-none !rounded-full !py-3 !border-black/15',
            title: '!typography-sm mt-1',
          },
        }}
      />
    </React.Fragment>
  )
})

Page.displayName = 'Page'
export default Page
