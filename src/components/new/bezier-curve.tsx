'use client'
import { cn, lerp } from '@/lib/utils'
import { useRef, useEffect, DetailedHTMLProps, HTMLAttributes } from 'react'

interface MouseEvent {
  movementY: number
  clientX: number
}

const BezierCurve = ({
  className,
  pathClassName,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  pathClassName?: string
}) => {
  // Define a reference to an SVGPathElement
  const path = useRef<SVGPathElement>(null)

  // Initialize progress, x, time, and reqId variables
  let progress = 0
  let x = 0.5
  let time = Math.PI / 2
  let reqId: number | null = null

  // Use the useEffect hook to set the path on component mount
  useEffect(() => {
    setPath(progress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Define a function to set the path of the SVG element
  const setPath = (progress: number) => {
    // Get the width of the window
    const width = window.innerWidth * 1

    // Set the "d" attribute of the SVG path element using a quadratic Bézier curve
    path.current?.setAttributeNS(
      null,
      'd',
      `M0 40 Q${width * x} ${40 + progress}, ${width} 40`,
    )
  }

  // Define a function to handle mouse enter events
  const handleOnEnter = () => {
    // If there is an animation frame request, cancel it and reset the animation
    if (reqId) {
      cancelAnimationFrame(reqId)
      resetAnimation()
    }
  }

  // Define a function to handle mouse move events
  const handleOnMove = (e: MouseEvent) => {
    // Get the movementY and clientX properties from the event object
    const { movementY, clientX } = e

    // Get the bounding rectangle of the SVG path element
    const pathBound = path.current?.getBoundingClientRect()

    // If the bounding rectangle exists, update x and progress and set the path
    if (pathBound) {
      x = (clientX - pathBound.left) / pathBound.width
      progress += movementY
      setPath(progress)
    }
  }

  // Define a function to handle mouse leave events
  const handleOnLeave = () => {
    // Start animating out
    animateOut()
  }

  // Define a function to animate out
  const animateOut = () => {
    // Calculate newProgress using sine of time
    const newProgress = progress * Math.sin(time)

    // Update progress using linear interpolation towards zero
    progress = lerp(progress, 0, 0.0275)

    // Increment time by 0.2
    time += 0.185

    // Set the path using newProgress
    setPath(newProgress)

    // If progress is greater than a threshold, request another animation frame,
    // otherwise reset the animation.
    if (Math.abs(progress) > 0.99) {
      reqId = requestAnimationFrame(animateOut)
    } else {
      resetAnimation()
    }
  }

  // Define a function to reset the animation variables
  const resetAnimation = () => {
    time = Math.PI / 2
    progress = 0
  }

  return (
    <div className={cn('relative w-full h-px', className)} {...props}>
      <div
        onMouseEnter={() => handleOnEnter()}
        onMouseMove={(e) => handleOnMove(e)}
        onMouseLeave={() => handleOnLeave()}
        className={'relative z-10 h-10 w-full top-[-40px]'}
      />
      <svg className={'absolute w-full h-[65px] top-[-40px]'}>
        <path
          ref={path}
          className={cn(
            'stroke-current w-full text-black stroke-[1px] fill-none',
            pathClassName,
          )}
        />
      </svg>
    </div>
  )
}

export default BezierCurve
