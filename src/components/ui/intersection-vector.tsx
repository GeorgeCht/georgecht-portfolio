'use client'

import React, { SVGProps, useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { cn, lerp } from '@/lib/utils'
import Elipsis from './elipsis'
import { useLenis } from '../providers/lenis'

const IntersectionVector = ({
  className,
  ...props
}: SVGProps<SVGSVGElement>) => {
  const [svgRotation, setSvgRotation] = useState(-15)
  const [dimensions, setDimensions] = useState<{
    width: number | null
    height: number | null
  }>({
    width: null,
    height: null,
  })

  // const lenis = useLenis()
  // lenis?.on('scroll', ({ scroll }: { scroll: number }) => {
  //   setSvgRotation(lerp(-10, 10, scroll / 666))
  // })

  const scale = 1.839
  const radius =
    typeof dimensions.width === 'number' ? dimensions.width * scale : 0

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  return (
    <svg
      style={{
        transform: `rotate(${svgRotation}deg)`,
        transition: 'transform 150ms ease',
      }}
      width={
        typeof dimensions.width === 'number' && dimensions.width >= 1090
          ? radius / 1.633
          : radius / 1.333
      }
      height={
        typeof dimensions.width === 'number' &&
        typeof dimensions.height === 'number' &&
        dimensions.width >= 1090
          ? radius / 2.333
          : dimensions.height! * 0.863
      }
      viewBox={`-${radius / (1.839 * 100)} ${(radius * 0.9) / 1.4} ${typeof dimensions.width === 'number' ? (dimensions.width * 1.839 * 2) / 1.839 : 0} ${typeof dimensions.height === 'number' ? dimensions.height / 1.839 : 0}`}
      xmlns={'http://www.w3.org/2000/svg'}
      className={cn(
        'z-0 pointer-events-none absolute top-[-15vw] left-[-15vw]',
        className,
      )}
      {...props}
    >
      {[...Array(5)].map((_, index) => (
        <Elipsis
          fill={'none'}
          deltaShift={index}
          key={index}
          stroke={`url(#linearGradient-${index})`}
          strokeOpacity={'1'}
          strokeWidth={'1'}
        />
      ))}
      <line
        x1={
          typeof dimensions.width === 'number'
            ? dimensions.width * 0.9 - 1 + (dimensions.width * 0.9) / 2
            : 0
        }
        y1={
          typeof dimensions.width === 'number'
            ? dimensions.width * 0.9 * 2 - 1
            : 0
        }
        x2={
          typeof dimensions.width === 'number'
            ? dimensions.width * 0.9 - 1 + (dimensions.width * 0.9) / 2
            : 0
        }
        y2={1}
        stroke={'url(#linearGradient-line-1)'}
        strokeOpacity={'1'}
        strokeWidth={'1'}
      />
      <line
        x1={
          typeof dimensions.width === 'number'
            ? -((dimensions.width * 0.9) / 2) - 1
            : 0
        }
        y1={
          typeof dimensions.width === 'number' ? dimensions.width * 0.9 - 1 : 0
        }
        x2={
          typeof dimensions.width === 'number'
            ? dimensions.width * 0.9 * 3.5 - 2
            : 0
        }
        y2={
          typeof dimensions.width === 'number' ? dimensions.width * 0.9 - 1 : 0
        }
        stroke={'url(#linearGradient-line-2)'}
        strokeOpacity={'1'}
        strokeWidth={'1'}
      />
      <defs>
        {[...Array(5)].map((_, index) => (
          <Motion.linearGradient
            id={`linearGradient-${index}`}
            x1={'100%'}
            x2={'100%'}
            y1={'100%'}
            y2={'100%'}
            key={`gradient-${index}`}
            animate={{
              x1: ['0%', '100%'],
              x2: ['0%', '85%'],
              y1: ['0%', '100%'],
              y2: ['0%', `${93 + (index / 10) * 5}%`],
            }}
            transition={{
              duration: (index / 10) * 2 + 8,
              ease: 'linear',
              repeat: Infinity,
              delay: (index / 10) * 2,
            }}
          >
            <stop stopColor="#0A0A0A" stopOpacity="0.35"></stop>
            <stop stopColor="#0A0A0A"></stop>
            <stop offset="50%" stopColor="#0A0A0A"></stop>
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.35"></stop>
          </Motion.linearGradient>
        ))}
        <Motion.linearGradient
          id={'linearGradient-line-1'}
          gradientUnits={'userSpaceOnUse'}
          x1={
            typeof dimensions.width === 'number'
              ? dimensions.width * 0.9 - 1 + (dimensions.width * 0.9) / 2
              : 0
          }
          y1={
            typeof dimensions.width === 'number'
              ? dimensions.width * 0.9 * 2 - 1
              : 0
          }
          x2={
            typeof dimensions.width === 'number'
              ? dimensions.width * 0.9 - 1 + (dimensions.width * 0.9) / 2
              : 0
          }
          y2={1}
          key={`linearGradient-line-1`}
          animate={{
            x1: ['0%', '100%'],
            x2: ['0%', '90%'],
            y1: ['0%', '100%'],
            y2: ['0%', '100%'],
          }}
          transition={{
            duration: Math.random() * 2 + 10,
            ease: 'linear',
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <stop stopColor="#0A0A0A" stopOpacity="0.5"></stop>
          <stop stopColor="#0A0A0A"></stop>
          <stop offset="50%" stopColor="#0A0A0A"></stop>
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.5"></stop>
        </Motion.linearGradient>
        <Motion.linearGradient
          id={'linearGradient-line-2'}
          gradientUnits={'userSpaceOnUse'}
          x1={
            typeof dimensions.width === 'number'
              ? -((dimensions.width * 0.9) / 2) - 1
              : 0
          }
          y1={
            typeof dimensions.width === 'number'
              ? dimensions.width * 0.9 - 1
              : 0
          }
          x2={
            typeof dimensions.width === 'number'
              ? dimensions.width * 0.9 * 3.5 - 2
              : 0
          }
          y2={
            typeof dimensions.width === 'number'
              ? dimensions.width * 0.9 - 1
              : 0
          }
          key={`linearGradient-line-2`}
          animate={{
            x1: ['0%', '100%'],
            x2: ['0%', '90%'],
            y1: ['0%', '100%'],
            y2: ['0%', '100%'],
          }}
          transition={{
            duration: Math.random() * 2 + 10,
            ease: 'linear',
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <stop stopColor="#0A0A0A" stopOpacity="0.5"></stop>
          <stop stopColor="#0A0A0A"></stop>
          <stop offset="50%" stopColor="#0A0A0A"></stop>
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.5"></stop>
        </Motion.linearGradient>
      </defs>
    </svg>
  )
}

export default IntersectionVector
