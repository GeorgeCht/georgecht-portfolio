import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"
import Reveal from "@/components/new/reveal"
import Pill from "@/components/new/button-pill"

const Root = ({
  children,
  className,
  fadeBottom = false,
  viewAll = false,
  theme = 'dark',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  fadeBottom?: boolean
  viewAll?: boolean
  theme?: 'light' | 'dark'
}) => {
  return (
    <section className={cn('mb-48', className)}>
      <div
        className={cn(
          'relative flex flex-col gap-2.5 px-2.5 md:px-4 pt-2 md:pt-6 w-full',
          fadeBottom &&
            'gradient-mask-t-[transparent_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,1)_100%]',
          theme === 'dark' ? 'text-black' : 'text-white',
        )}
        {...props}
      >
        {children}
      </div>

      {viewAll && (
        <div
          className={'flex flex-row gap-2.5 px-2.5 md:px-4 mt-16 w-full'}
          {...props}
        >
          <div className={'w-1/6 hidden lg:flex'} />
          <div className={'lg:w-5/6 w-full flex'}>
            <Reveal y={false} opacity delay={0.5}>
              <Pill.ButtonFlip
                innerText={'View all ↗'}
                href={'/archive'}
                scroll={false}
              />
            </Reveal>
          </div>
        </div>
      )}
    </section>
  )
}

export default Root