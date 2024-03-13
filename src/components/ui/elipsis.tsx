'use client'

import { useEffect, useState } from 'react'
import { motion as Motion, SVGMotionProps } from 'framer-motion'

type Diameter = string | number | undefined
type ElipsisProps = Omit<
  SVGMotionProps<SVGCircleElement>,
  'cx' | 'cy' | 'r'
> & {
  deltaShift: number
}

const Elipsis = ({ deltaShift = 0, stroke, ...props }: ElipsisProps) => {
  const [diameter, setDiameter] = useState<Diameter>(0)
  const circleX =
    typeof diameter === 'number'
      ? deltaShift === 0
        ? diameter / 2
        : (diameter / 2) * deltaShift + diameter / 2
      : 0

  useEffect(() => {
    const onResize = () => setDiameter(window.innerWidth * 0.9)
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <Motion.circle
      cx={circleX}
      cy={typeof diameter === 'number' ? diameter : 0}
      r={typeof diameter === 'number' ? diameter : 0}
      stroke={stroke || 'white'}
      {...props}
    />
  )
}

export default Elipsis
