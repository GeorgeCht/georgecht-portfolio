'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import useHoverSwipe from '@/stores/hover-swipe'

const HoverSwipe = () => {
  const modalContainer = useRef<HTMLDivElement>(null)
  const [render, setRender] = useState(false)
  const { modal, projects, show, allowMouseEvents } = useHoverSwipe()
  const { active, index } = modal
  const scaleAnimation = {
    initial: { scale: 0, x: '-50%', y: '-50%' },
    enter: {
      scale: show ? 1 : 0,
      x: '-50%',
      y: '-50%',
      transition: { duration: 0.4, ease: [1, 0, 0.01, 1] },
    },
    closed: {
      scale: 0,
      x: '-50%',
      y: '-50%',
      transition: { duration: 0.4, ease: [1, 0, 0.01, 1] },
    },
  }

  useEffect(() => {
    window.innerWidth >= 768 && setRender(true)
    let xMoveContainer = gsap.quickTo(modalContainer.current, 'left', {
      duration: 0.666,
      ease: 'power3',
    })
    let yMoveContainer = gsap.quickTo(modalContainer.current, 'top', {
      duration: 0.666,
      ease: 'power3',
    })

    const mouseHandler = (e: MouseEvent) => {
      const { pageX, pageY } = e
      xMoveContainer(pageX)
      yMoveContainer(pageY)
    }

    window.addEventListener('mousemove', mouseHandler)

    return () => {
      window.removeEventListener('mousemove', mouseHandler)
    }
  }, [allowMouseEvents])

  return (
    <React.Fragment>
      <Motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial={'initial'}
        animate={active ? 'enter' : 'closed'}
        className={cn(
          'hoverswipe absolute overflow-hidden pointer-events-none',
          'items-center justify-center w-[400px] h-[400px]',
          render ? 'flex' : 'hidden',
        )}
      >
        <div
          style={{ top: index * -100 + '%' }}
          className={
            'w-full h-full absolute transition-all ease-in-expo duration-[666ms]'
          }
        >
          {projects.map((project, index) => {
            const { title, image, color } = project
            return (
              <div
                className={'w-full h-full flex items-center justify-center'}
                style={{ backgroundColor: color }}
                key={index}
              >
                <Image
                  src={image}
                  width={380}
                  height={0}
                  className={'h-auto'}
                  alt={title}
                />
              </div>
            )
          })}
        </div>
      </Motion.div>
    </React.Fragment>
  )
}

export default HoverSwipe
