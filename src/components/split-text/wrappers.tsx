import React, { PropsWithChildren } from 'react'

export interface LineWrapperProps<T = unknown> extends PropsWithChildren {
  lineIndex: number
  extraProps?: T
}

export const LineWrapper = ({ children }: LineWrapperProps) => (
  <div>{children}</div>
)

export interface WordWrapperProps<T = any> extends PropsWithChildren {
  lineIndex: number
  wordIndex: number
  countIndex: number
  extraProps?: T
}

export const WordWrapper = ({ children }: WordWrapperProps) => (
  <span style={{ whiteSpace: 'pre' }}>{children}</span>
)

export interface LetterWrapperProps<T = any> extends PropsWithChildren {
  lineIndex: number
  wordIndex: number
  letterIndex: number
  countIndex: number
  extraProps?: T
}

export const LetterWrapper = ({ children }: LetterWrapperProps) => (
  <span>{children}</span>
)
