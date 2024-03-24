import { HTMLAttributes, useRef } from 'react'
import TextReveal from '@/components/ui/text-reveal'
import React from 'react'

const RowDisplay = ({
  year,
  title,
  client,
  roleField: role,
  index = 0,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  year: string | number
  title: string
  client: string
  roleField: string
  index?: number
}) => {
  const animation = {
    delay: index * 0.025,
    step: 0.035,
  }
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      className={
        'flex flex-row-reverse sm:flex-row gap-1 sm:gap-2.5 pt-3 -mb-3 sm:mb-0 w-full *:transition-all'
      }
      {...props}
    >
      <div className={'w-1/6 flex lg:flex sm:hidden'}>
        <TextReveal
          as={'p'}
          lineHeight={'1em'}
          enterY={'10%'}
          delay={animation.delay}
          className={'mb-0 sm:-mb-3.5'}
          typeClass={'typography-sm'}
          text={String(year)}
        />
      </div>
      <div className={'w-full sm:w-1/2 lg:w-1/3'}>
        <TextReveal
          as={'p'}
          lineHeight={'1.3em'}
          enterY={'10%'}
          delay={animation.delay + animation.step}
          className={'-mb-1 sm:-mb-3.5 w-fit'}
          typeClass={'typography-md mr-1.5'}
          text={title}
        />
      </div>

      <div className={'w-full sm:w-1/2 lg:w-1/3'}>
        <TextReveal
          as={'p'}
          lineHeight={'1.3em'}
          enterY={'10%'}
          delay={animation.delay + animation.step * 2}
          className={'-mb-1 -mt-0.5 sm:-mb-3.5'}
          typeClass={'typography-md mr-1.5'}
          text={client}
        />
      </div>

      <div className={'w-1/6 -mt-1 hidden lg:flex'}>
        <TextReveal
          as={'p'}
          lineHeight={'1.3em'}
          enterY={'10%'}
          delay={animation.delay + animation.step * 3}
          className={'mb-1.5 sm:-mb-3.5'}
          typeClass={'typography-md'}
          text={role}
        />
      </div>
    </div>
  )
}

export default RowDisplay
