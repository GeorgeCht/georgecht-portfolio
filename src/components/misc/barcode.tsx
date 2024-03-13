'use client'

import React, { forwardRef, ForwardRefRenderFunction, useRef } from 'react'
import {
  motion as Motion,
  MotionProps,
  SVGMotionProps,
  useInView,
} from 'framer-motion'

const anim = (variants: MotionProps['variants']) => {
  return {
    variants,
    initial: 'initial',
    exit: 'exit',
  }
}

const Barcode: ForwardRefRenderFunction<
  SVGSVGElement,
  SVGMotionProps<SVGSVGElement> & {
    delay?: number
  }
> = ({ delay = 0, ...props }, ref) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapperRef, { once: true })

  return (
    <div className={'relative w-fit'} ref={wrapperRef}>
      <Motion.svg
        ref={ref}
        width={'132'}
        height={'71'}
        viewBox={'0 0 132 71'}
        fill={'#0A0A0A'}
        xmlns={'http://www.w3.org/2000/svg'}
        animate={isInView ? 'enter' : 'exit'}
        {...anim({
          initial: {
            opacity: 0,
            scaleY: 0,
          },
          enter: {
            opacity: 1,
            scaleY: 1,
            transition: {
              duration: 1.285,
              delay: delay,
              ease: [0.76, 0, 0.24, 1],
            },
            transitionEnd: {
              opacity: 1,
              scaleY: 1,
            },
          },
          exit: {
            opacity: 0,
            scaleY: 0,
            transition: {
              duration: 1.285,
              delay: delay / 10,
              ease: [0.76, 0, 0.24, 1],
            },
          },
        })}
        {...props}
      >
        <path d={'M1.38947 0H0V71H1.38947V0Z'} />
        <path d={'M4.16838 71H2.7789V0H4.16838V71Z'} />
        <path d={'M6.94728 71H5.55781V0H6.94728V71Z'} />
        <path d={'M13.8949 71H8.33703V0H13.8949V71Z'} />
        <path d={'M19.4527 71H16.6737V0H19.4527V71Z'} />
        <path d={'M23.621 71H22.2315V0H23.621V71Z'} />
        <path d={'M30.5686 71H27.7897V0H30.5686V71Z'} />
        <path d={'M33.3475 71H31.958V0H33.3475V71Z'} />
        <path d={'M38.9054 71H34.7369V0H38.9054V71Z'} />
        <path d={'M43.0737 71H40.2947V0H43.0737V71Z'} />
        <path d={'M45.8526 71H44.4631V0H45.8526V71Z'} />
        <path d={'M52.7999 71H47.242V0H52.7999V71Z'} />
        <path d={'M56.9685 71H55.579V0H56.9685V71Z'} />
        <path d={'M62.5263 71H59.7474V0H62.5263V71Z'} />
        <path d={'M65.3052 71H63.9157V0H65.3052V71Z'} />
        <path d={'M68.0841 71H66.6946V0H68.0841V71Z'} />
        <path d={'M70.8633 71H69.4739V0H70.8633V71Z'} />
        <path d={'M77.8106 71H73.6422V0H77.8106V71Z'} />
        <path d={'M80.5895 71H79.2V0H80.5895V71Z'} />
        <path d={'M83.3684 71H81.9789V0H83.3684V71Z'} />
        <path d={'M93.0949 71H88.9265V0H93.0949V71Z'} />
        <path d={'M95.8738 71H94.4843V0H95.8738V71Z'} />
        <path d={'M100.042 71H98.6527V0H100.042V71Z'} />
        <path d={'M106.989 71H105.6V0H106.989V71Z'} />
        <path d={'M111.158 71H108.379V0H111.158V71Z'} />
        <path d={'M115.326 71H112.547V0H115.326V71Z'} />
        <path d={'M119.495 71H118.105V0H119.495V71Z'} />
        <path d={'M125.053 71H123.663V0H125.053V71Z'} />
        <path d={'M129.221 71H127.832V0H129.221V71Z'} />
        <path d={'M132 71H130.611V0H132V71Z'} />
      </Motion.svg>
    </div>
  )
}

Barcode.displayName = 'Barcode'
export default forwardRef(Barcode)
