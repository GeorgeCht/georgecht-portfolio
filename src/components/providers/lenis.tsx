'use client'

import Tempus from '@studio-freight/tempus'
import Lenis from '@studio-freight/lenis'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { isMacOS } from '@/lib/utils'

export const lenisCTX = createContext<Lenis | null>(null)
export const useLenis = () => useContext(lenisCTX)

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis()

    setLenis(lenis)
    const resize = setInterval(() => {
      lenis.resize()
    }, 150)
    function onFrame(time: number) {
      lenis.raf(time)
    }
    const unsubscribe = Tempus.add(onFrame)

    return () => {
      unsubscribe()
      clearInterval(resize)
      setLenis(null)
      lenis.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      {isMacOS ? (
        <lenisCTX.Provider value={lenis} data-lenis-prevent>
          {children}
        </lenisCTX.Provider>
      ) : (
        children
      )}
    </React.Fragment>
  )
}

export default LenisProvider
