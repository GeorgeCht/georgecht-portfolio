import { useEffect } from 'react'
import { useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'

const useScrollVelocity = (min: number = -3.275, max: number = 3.275) => {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const springVelocity = useSpring(scrollVelocity, {
    stiffness: 200,
    damping: 50,
  })
  const calculatedValue = useTransform(
    springVelocity,
    [-1000, 1000],
    [min, max],
  )
  return { calculatedValue }
}

export { useScrollVelocity }

const useScrollToTop = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 })
    }
  }, [])
}

export { useScrollToTop }
