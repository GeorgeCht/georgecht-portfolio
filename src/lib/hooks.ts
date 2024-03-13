import exp from 'constants'
import { useState, useEffect } from 'react'

const useClockHours = () => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour(new Date().getHours())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return String(currentHour < 10 ? '0' + currentHour : currentHour)
}

const useClockMinutes = () => {
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMinute(new Date().getMinutes())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return String(currentMinute < 10 ? '0' + currentMinute : currentMinute)
}

export { useClockHours, useClockMinutes }

const useScrollToTop = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 })
    }
  }, [])
}

export { useScrollToTop }
