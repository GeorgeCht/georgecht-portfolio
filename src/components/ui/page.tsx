'use client'

import { cn, setBodyBg } from '@/lib/utils'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React, {
  forwardRef,
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
} from 'react'
import { Toaster } from 'sonner'

const Page = forwardRef<
  HTMLElement,
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
>(({ children, className, ...props }, ref) => {
  const router = useRouter()

  useEffect(() => {
    setBodyBg('#fff')

    // Scroll restoration fix @see: https://github.com/vercel/next.js/issues/20951#issuecomment-1003746732
    router.beforePopState((state) => {
      state.options.scroll = false
      return true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <Script
        id={'scroll-restoration'}
      >{`window.history.scrollRestoration = "manual"`}</Script>
    </React.Fragment>
  )
})

Page.displayName = 'Page'
export default Page
