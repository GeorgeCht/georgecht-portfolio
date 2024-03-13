import { cn } from '@nextui-org/react'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

const HoverFlip = ({
  className,
  childClassName,
  innerText,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
  childClassName?: string | undefined
  innerText?: string | undefined
}) => {
  return (
    <span
      className={cn(
        'group relative inline-block overflow-hidden h-[76%] cursor-pointer',
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
    </span>
  )
}

export default HoverFlip
