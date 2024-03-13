'use client'

import TextReveal from '@/components/ui/text-reveal'
import { cn } from '@/lib/utils'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

const SectionIndicator = ({
  delay = 0.375,
  number = 0,
  name,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  number?: number | undefined
  name: string
  delay?: number | undefined
}) => {
  return (
    <div className={cn('flex flex-col', className)} {...props}>
      <TextReveal
        as={'p'}
        delay={delay}
        className={'mt-[-0.425em]'}
        typeClass={'type-mono-2xs'}
        text={`Section 00${number || 0}`}
      />
      <span className={'flex flex-row'}>
        <TextReveal
          as={'p'}
          delay={delay + delay / 4}
          className={'mt-[-0.925em]'}
          typeClass={'type-mono-2xs'}
          text={name}
        />
        <TextReveal
          as={'p'}
          delay={((delay + delay / 4) * name.split('').length) / 10}
          className={'mt-[-0.785em] -ml-1 animate-blink'}
          typeClass={'type-mono-2xs'}
          text={'—'}
        />
      </span>
    </div>
  )
}

export default SectionIndicator
