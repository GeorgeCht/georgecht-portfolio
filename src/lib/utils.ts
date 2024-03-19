import { type ClassValue, clsx } from 'clsx'
import { MotionValue, useTransform } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const lerp = (a: number, b: number, t: number) => a + t * (b - a)

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function debounce(callback: Function, wait: number, immediate = false) {
  let timeout: string | number | NodeJS.Timeout | undefined

  return function (this: any, ...args: any[]) {
    const callNow = immediate && !timeout
    const nextDo = () => callback.apply(this, args)

    clearTimeout(timeout)
    timeout = setTimeout(nextDo, wait)

    if (callNow) {
      nextDo()
    }
  }
}

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [distance, -distance])
}

export function splitCheck(split: string, keyword: string) {
  return split.includes(keyword)
}

export class LineProcessor {
  private el: HTMLSpanElement | null
  private text: string
  private maxCharPerLine: React.MutableRefObject<number>
  private linesState: [
    Array<string>,
    React.Dispatch<React.SetStateAction<Array<string>>>,
  ]

  constructor({
    el,
    text,
    maxCharPerLine,
    linesState,
  }: {
    el: HTMLSpanElement | null
    text: string
    maxCharPerLine: React.MutableRefObject<number>
    linesState: [
      Array<string>,
      React.Dispatch<React.SetStateAction<Array<string>>>,
    ]
  }) {
    this.el = el
    this.text = text
    this.maxCharPerLine = maxCharPerLine
    this.linesState = linesState
  }

  private processLines(): Array<string> {
    if (!this.el) return []

    let newLines: Array<string> = []
    let words: Array<string> = []
    let lastY: number | null = null

    Array.from(this.el.children).forEach((child) => {
      const y = child.getBoundingClientRect().top
      if (lastY !== null && y !== lastY) {
        newLines.push(words.join(' '))
        words = []
      }
      lastY = y
      words.push((child.textContent || '').trim())
    })

    newLines.push(words.join(' '))
    return newLines
  }

  private calculateCharPerLine(previous: Array<string>): number {
    return (
      this.maxCharPerLine.current ||
      Math.max(...previous.map((line) => line.length), 0)
    )
  }

  private processText(): Array<string> {
    const charPerLine = this.calculateCharPerLine(this.linesState[0])
    const lines: Array<string> = []
    let line = ''
    let charCount = 0

    this.text.split(' ').forEach((word) => {
      charCount += word.length + 1
      if (charCount > charPerLine + 1) {
        lines.push(line.trim())
        line = ''
        charCount = 0
      }
      line += word.trim() + ' '
    })

    lines.push(line.trim())
    return lines
  }

  public renderLines(): void {
    const newLines = this.processLines()
    if (this.linesState[0].length > 0) {
      this.linesState[1](this.processText())
    } else {
      this.linesState[1](newLines)
    }
  }

  public refreshLines(): void {
    const lines = this.processText()
    this.linesState[1](lines)

    const charPerLine = this.calculateCharPerLine(lines)
    if (charPerLine > this.maxCharPerLine.current) {
      this.maxCharPerLine.current = charPerLine
    }
  }
}

export const isMacOS =
  typeof window !== 'undefined'
    ? navigator.userAgent.toUpperCase().indexOf('MAC') >= 0
    : false

export function getRandomNumber(): string {
  return (
    '00' +
    Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, '0')
  )
}

export const deltaDiff = (a: number, b: number) => Math.abs(a - b)

export const getYear = () => new Date().getFullYear()

export const setBodyBg = (color: string) => {
  document.body.style.backgroundColor = color
}

export const chunkedArray = <T>(
  array: Array<T>,
  chunkSize: number,
): Array<Array<T>> => {
  const chunked = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunked.push(array.slice(i, i + chunkSize))
  }
  return chunked
}
