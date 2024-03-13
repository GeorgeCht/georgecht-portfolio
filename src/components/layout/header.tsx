'use client'

import Link from 'next/link'
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react'
import { cn, wait } from '@/lib/utils'
import TextReveal from '@/components/ui/text-reveal'
import Magnetic from '@/components/ui/magnetic'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import Pill from '@/components/new/button-pill'
import MatterMenu from '@/components/new/matter-menu'
import { usePathname, useRouter } from 'next/navigation'

const Header = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isOnHome, setIsOnHome] = useState(false)
  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/', text: 'Projects' },
    { href: '/', text: 'About' },
    { href: '/', text: 'Archive' },
    { href: '/', text: 'Contact' },
  ]

  useEffect(() => {
    setIsOpen(false)
    setIsOnHome(pathname === '/')
  }, [pathname])

  const animationSvgPathUpper = {
    initial: { rotate: 0, y: 0 },
    enter: {
      rotate: '38deg',
      y: 6,
      transition: {
        duration: 1.275,
        ease: [1, 0, 0.01, 1],
        delay: 0.0425,
      },
    },
    exit: {
      rotate: 0,
      y: 0,
      transition: {
        duration: 1,
        ease: [1, 0, 0.01, 1],
        delay: 0.0425 / 4,
      },
    },
  }
  const animationSvgPathMid = {
    initial: { scaleX: 1 },
    enter: {
      scaleX: 0,
      transition: {
        duration: 1.275,
        ease: [1, 0, 0.01, 1],
        delay: 0.0425,
      },
    },
    exit: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [1, 0, 0.01, 1],
        delay: 0.0425 / 4,
      },
    },
  }
  const animationSvgPathLower = {
    initial: { rotate: 0, y: 0 },
    enter: {
      rotate: '-38deg',
      y: -6,
      transition: {
        duration: 1.275,
        ease: [1, 0, 0.01, 1],
        delay: 0.0425,
      },
    },
    exit: {
      rotate: 0,
      y: 0,
      transition: {
        duration: 1,
        ease: [1, 0, 0.01, 1],
        delay: 0.0425 / 4,
      },
    },
  }
  const animationSvg = {
    initial: { scale: 1, y: 0 },
    enter: {
      y: 10,
      scale: 1.475,
      transition: {
        duration: 1.275,
        ease: [1, 0, 0.01, 1],
        delay: 0.0425,
      },
    },
    exit: {
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [1, 0, 0.01, 1],
        delay: 0.0425 / 4,
      },
    },
  }
  const animationModalPane = {
    initial: { y: '-100%' },
    enter: {
      y: 0,
      transition: {
        duration: 1.375,
        ease: [1, 0, 0.1, 1],
      },
    },
    exit: {
      y: '100%',
      transition: {
        duration: 1,
        ease: [1, 0, 0.1, 1],
      },
    },
  }
  const animationIntro = {
    initial: {
      opacity: 0,
      y: '100%',
    },
    enter: {
      y: '0%',
      opacity: 1,
      delay: 0.275,
      transition: {
        duration: 1.375,
        ease: [1, 0, 0.01, 1],
      },
    },
    exit: {
      y: '0%',
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 275,
        damping: 30,
      },
    },
  }

  return (
    <header
      className={cn('relative flex flex-row w-full', className)}
      {...props}
    >
      <AnimatePresence mode={'wait'}>
        {isOpen && (
          <Motion.div
            variants={animationModalPane}
            initial={'initial'}
            animate={isOpen ? 'enter' : 'exit'}
            exit={'exit'}
            className={
              'flex fixed top-0 left-0 w-screen h-screen bg-transparent z-[20] overflow-hidden'
            }
          >
            <MatterMenu
              onClick={() => setIsOpen((state) => !state)}
              setIsOpen={setIsOpen}
            />
          </Motion.div>
        )}
      </AnimatePresence>
      <div
        className={
          'w-full fixed flex flex-row justify-between top-0 z-[999] px-2.5 pt-4 md:px-4'
        }
      >
        <Motion.div
          className={'flex flex-row w-fit items-end'}
          variants={animationIntro}
          initial={'initial'}
          animate={'enter'}
          exit={'exit'}
        >
          {!isOnHome && (
            <React.Fragment>
              <Pill.ButtonFlip
                scroll={false}
                href={'/'}
                innerText={'← Back'}
                className={'pt-[3px] pb-0 sm:pb-0.5 hidden min-[400px]:flex'}
              />
              <Pill.ButtonFlip
                scroll={false}
                href={'/'}
                innerText={'←'}
                className={'pt-0.5 pb-0.5 sm:pb-0.5 flex min-[400px]:hidden'}
              />
            </React.Fragment>
          )}
          <Pill.ActionFlip
            innerText={isOpen ? 'Close' : 'Navigate'}
            onClick={() => setIsOpen((state) => !state)}
          />
        </Motion.div>
        <Motion.div
          variants={animationIntro}
          initial={'initial'}
          animate={'enter'}
          exit={'exit'}
          className={'hidden sm:flex flex-row w-fit mt-1'}
        >
          <Pill.ButtonFlip
            innerText={'Projects'}
            href={'/projects'}
            scroll={false}
          />
          <Pill.ButtonFlip
            innerText={'Contact'}
            href={'/contact'}
            scroll={false}
          />
        </Motion.div>
      </div>
    </header>
  )
}

export default Header
