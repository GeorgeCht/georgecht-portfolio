import Link, { LinkProps } from 'next/link'
import React, { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import Magnetic from '@/components/ui/magnetic'

const PillButton = ({
  href,
  className,
  children,
  reversed = false,
  magnetic = true,
  ...props
}: LinkProps & {
  reversed?: boolean
  magnetic?: boolean
  className?: string
  children: React.ReactNode
}) => {
  const Wrapper = magnetic ? Magnetic : 'div'

  return (
    <Wrapper>
      <Link
        href={href}
        className={cn(
          'typography-lg border border-black rounded-full hover:cursor-pointer px-2.5 pt-1',
          reversed
            ? 'bg-black hover:bg-white hover:text-black text-white'
            : 'bg-white hover:bg-black hover:text-white',
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    </Wrapper>
  )
}

const PillButtonFlip = ({
  href,
  className,
  reversed = false,
  innerText,
  childClassName,
  ...props
}: LinkProps & {
  innerText: string
  reversed?: boolean
  className?: string
  childClassName?: string | undefined
}) => {
  return (
    <Magnetic>
      <Link
        href={href}
        className={cn(
          'group relative inline-block overflow-hidden h-[76%]',
          'typography-lg border border-black rounded-full hover:cursor-pointer px-2.5 pt-1',
          reversed
            ? 'bg-black hover:bg-white hover:text-black text-white'
            : 'bg-white hover:bg-black hover:text-white',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            'inline-block relative z-[1] duration-[1.175s] will-change-transform',
            'ease-[cubic-bezier(0.15,1,0.15,1)] transition-transform',
            'after:content-[attr(data-text)] after:block after:absolute after:skew-y-[4deg]',
            'after:origin-[left_top] after:duration-[2s] after:transition-transform',
            'after:ease-[cubic-bezier(0.19,1,0.22,1)] after:mt-0 after:top-full',
            'group-hover:translate-y-[-100%] after:group-hover:skew-y-0',
            childClassName,
          )}
          data-text={innerText}
        >
          {innerText}
        </span>
      </Link>
    </Magnetic>
  )
}

const PillAction = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Magnetic>
      <button
        type={'button'}
        className={cn(
          'typography-lg bg-white hover:cursor-pointer px-2.5 pt-1',
          'hover:text-white border border-black rounded-full overflow-hidden',
          'hover:bg-white md:hover:bg-black hover:text-black md:hover:text-white',
          'active:bg-black active:text-white',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </Magnetic>
  )
}

const PillActionFlip = ({
  className,
  innerText,
  childClassName,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  innerText: string
  className?: string
  childClassName?: string | undefined
}) => {
  return (
    <Magnetic>
      <button
        type={'button'}
        className={cn(
          'group relative inline-block overflow-hidden h-[76%]',
          'typography-lg bg-white hover:cursor-pointer px-2.5 pt-1',
          'hover:text-white border border-black rounded-full overflow-hidden',
          'hover:bg-white md:hover:bg-black hover:text-black md:hover:text-white',
          'active:bg-black active:text-white',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            'inline-block relative z-[1] duration-[1.175s] will-change-transform',
            'ease-[cubic-bezier(0.15,1,0.15,1)] transition-transform',
            'after:content-[attr(data-text)] after:block after:absolute after:skew-y-[4deg]',
            'after:origin-[left_top] after:duration-[2s] after:transition-transform',
            'after:ease-[cubic-bezier(0.19,1,0.22,1)] after:mt-0 after:top-full',
            'group-hover:translate-y-[-100%] after:group-hover:skew-y-0',
            childClassName,
          )}
          data-text={innerText}
        >
          {innerText}
        </span>
      </button>
    </Magnetic>
  )
}

const PillMatter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { canHover?: boolean; innerText: string }
>(({ className, innerText, canHover = 'true', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden h-[76%]',
        'flex w-fit -mb-[0.1em] select-none items-center justify-center',
        'bg-white border border-black rounded-full overflow-hidden',
        canHover &&
          'hover:bg-white md:hover:bg-black hover:text-black md:hover:text-white',
        canHover && 'active:bg-black active:text-white',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block relative z-[1] duration-[1.175s] will-change-transform',
          'ease-[cubic-bezier(0.15,1,0.15,1)] transition-transform',
          'after:content-[attr(data-text)] after:block after:absolute after:skew-y-[4deg]',
          'after:origin-[left_top] after:duration-[2s] after:transition-transform',
          'after:ease-[cubic-bezier(0.19,1,0.22,1)] after:mt-0 after:top-full after:leading-[1em]',
          'group-hover:translate-y-[-85%] after:group-hover:skew-y-0',
          'typography-display text-[20vw] md:text-[13.333vw] leading-[1em] pt-[0.185em] px-[0.125em]',
        )}
        data-text={innerText}
      >
        {innerText}
      </span>
    </div>
  )
})

PillMatter.displayName = 'PillMatter'

const Pill = {
  Button: PillButton,
  Action: PillAction,
  Matter: PillMatter,
  ButtonFlip: PillButtonFlip,
  ActionFlip: PillActionFlip,
}

export default Pill
