import React, {
  ComponentType,
  CSSProperties,
  forwardRef,
  PropsWithChildren,
} from 'react'
import {
  LineWrapperProps,
  WordWrapperProps,
  LetterWrapperProps,
} from './wrappers'
import { SplitTextInner } from './inner'

export interface SplitTextProps<T = any> extends PropsWithChildren {
  className?: string
  style?: CSSProperties
  // eslint-disable-next-line no-unused-vars
  ref?: ((instance: unknown) => void) | React.MutableRefObject<unknown> | null
  LineWrapper?: ComponentType<LineWrapperProps>
  WordWrapper?: ComponentType<WordWrapperProps>
  LetterWrapper?: ComponentType<LetterWrapperProps>
  extraProps?: T
}

export const SplitText = forwardRef(function SplitText(
  { children, ...props }: SplitTextProps,
  ref,
) {
  return (
    <SplitTextInner {...props} ref={ref}>
      {children}
    </SplitTextInner>
  )
})
