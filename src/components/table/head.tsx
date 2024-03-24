import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import TextReveal from '@/components/ui/text-reveal'

const Head = ({
  className,
  theme = 'dark',
  as = 'h2',
  ...props
}: HTMLAttributes<HTMLDivElement> &
  AsProp<'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'> & {
    theme?: 'dark' | 'light'
  }) => {
  return (
    <div
      className={cn(
        'flex flex-row-reverse sm:flex-row gap-2.5 pt-6 sm:pt-20 pb-2 sm:pb-10 w-full',
        theme === 'dark' ? 'text-black' : 'text-white',
        className,
      )}
      {...props}
    >
      <div className={'w-1/6 flex lg:flex sm:hidden'}>
        <TextReveal
          as={as}
          lineHeight={'0.9em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5'}
          typeClass={'typography-caps-sm'}
          text={'Year'}
        />
      </div>
      <div className={'w-full sm:w-1/2 lg:w-1/3'}>
        <TextReveal
          as={as}
          lineHeight={'0.9em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5'}
          typeClass={'typography-caps-sm'}
          text={'Project'}
        />
      </div>

      <div className={'w-full sm:w-1/2 lg:w-1/3'}>
        <TextReveal
          as={as}
          lineHeight={'0.9em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5'}
          typeClass={'typography-caps-sm'}
          text={'Client'}
        />
      </div>

      <div className={'w-1/6 hidden lg:flex'}>
        <TextReveal
          as={as}
          lineHeight={'0.9em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5 w-full h-[0.9em] overflow-hidden'}
          typeClass={'typography-caps-sm'}
          text={'Role'}
        />
      </div>
    </div>
  )
}

export default Head
