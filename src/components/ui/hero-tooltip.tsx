'use client'

import { useEffect, useMemo, useState } from 'react'
import { cn, wait } from '@/lib/utils'
import { HTMLMotionProps, motion as Motion, MotionProps } from 'framer-motion'
import React, { forwardRef, ForwardRefRenderFunction } from 'react'

const anim = (variants: MotionProps['variants']) => {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  }
}

const HeroTooltip: ForwardRefRenderFunction<
  HTMLDivElement,
  HTMLMotionProps<'div'> & {
    listItems: Array<string>
  }
> = ({ listItems, ...props }, ref) => {
  const [posY, setPosY] = useState(0.1)
  const [isHover, setIsHover] = useState(false)
  const [repeaterPosY, setRepeaterPosY] = useState(0.1)
  const [iterationCount, setIterationCount] = useState(0)
  const [tooltipWidth, setTooltipWidth] = useState(300)
  const items = useMemo(
    () => Array.from({ length: 10 }, () => listItems).flat(),
    [listItems],
  )

  const iterationsBeforeUpdate = items.length
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const container = document.getElementById('hero-entry')
    setCoords({
      x: container?.clientWidth! * 0.3822 + 18 || 0,
      y:
        container?.clientWidth! <= 1024
          ? container?.clientHeight! / 2 + container?.clientHeight! / 2.2 || 0
          : container?.clientHeight! / 2.1 || 0,
    })
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      if (container && container.contains(event.target as Node)) {
        setIsHover(true)
        setCoords({ x: clientX, y: clientY })
      } else {
        setIsHover(false)
        setCoords({
          x: container?.clientWidth! * 0.3822 + 10 || 0,
          y: container?.clientHeight! / 2 || 0,
        })
      }
    }

    if (typeof window !== 'undefined' && window.innerWidth >= 640) {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIterationCount((oldCount) => oldCount + 1)
      setPosY((oldPos) => oldPos - 1.375)
      setTooltipWidth(
        items[iterationCount] !== undefined
          ? [...items, ...items, ...items][iterationCount].length * 15
          : 300,
      )
      if (iterationCount === iterationsBeforeUpdate) {
        setIterationCount(0)
        wait(1185 / 2).then(() => {
          setRepeaterPosY((oldPos) => oldPos + 1.375 * items.length)
        })
      }
    }, 1185)
    return () => clearInterval(interval)
  }, [iterationCount, iterationsBeforeUpdate, items])

  return (
    <Motion.div
      ref={ref}
      className={cn(
        'absolute h-[22px] z-20 pointer-events-none transition-transform ease-in-expo duration-300',
        !isHover && 'transition-all ease-in-expo duration-300',
      )}
      style={{ top: `${coords?.y}px`, left: `${coords?.x}px` }}
      {...anim({
        initial: {
          opacity: 0,
        },
        enter: {
          opacity: 1,
          transition: {
            duration: 0.825,
            ease: [1, 0, 0.01, 1],
            delay: 1.3425,
          },
          transitionEnd: {
            opacity: 1,
          },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.825, ease: [1, 0, 0.01, 1], delay: 0.0425 },
        },
      })}
      {...props}
    >
      <div
        style={{ width: `${tooltipWidth}px` }}
        className={
          'absolute bg-[#D7F32B] border border-[#0a0a0a]/70 w-full h-[22px] overflow-hidden transition-all ease-in-expo duration-1000 rounded-full'
        }
      >
        <span
          className={'absolute w-full mt-[-0.1em]'}
          style={{ transform: `translateY(${repeaterPosY}em)` }}
        >
          <ul
            className={
              'flex flex-col items-center transition-transform ease-in-expo duration-1000'
            }
            style={{ transform: `translateY(${posY}em)` }}
          >
            {[...items, ...items, ...items].map((item, index) => (
              <li className={'type-base'} key={index}>
                {item}
              </li>
            ))}
          </ul>
        </span>
      </div>
    </Motion.div>
  )
}

HeroTooltip.displayName = 'HeroTooltip'
export default forwardRef(HeroTooltip)
