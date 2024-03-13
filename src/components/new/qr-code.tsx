import { useRef } from 'react'
import { useInView, motion as Motion, SVGMotionProps } from 'framer-motion'

const QRCode = ({ ...props }: SVGMotionProps<SVGSVGElement>) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapperRef, { once: true })
  const animation = {
    initial: { y: '120%' },
    enter: {
      y: '0%',
      transition: {
        duration: 1.875,
        ease: [1, 0, 0.01, 1],
        delay: 0.525,
      },
    },
    exit: {
      y: '120%',
      transition: {
        type: 'spring',
        stiffness: 275,
        damping: 30,
        delay: 0.195 / 4,
      },
    },
  }

  return (
    <div ref={wrapperRef} className={'relative w-full h-full overflow-hidden'}>
      <Motion.svg
        width={'200'}
        height={'200'}
        viewBox={'0 0 200 200'}
        fill={'none'}
        xmlns={'http://www.w3.org/2000/svg'}
        variants={animation}
        initial={'initial'}
        animate={isInView ? 'enter' : 'exit'}
        exit={'exit'}
        {...props}
      >
        <path
          d={
            'M24 72H16V80H24V72ZM40 80H32V88H40V80ZM40 128H32V136H40V128ZM48 72H40V80H48V72ZM56 64H48V72H56V64ZM56 80H48V88H56V80ZM56 128H48V136H56V128ZM64 72H56V80H64V72ZM64 88H56V96H64V88ZM80 16H72V24H80V16ZM80 40H72V48H80V40ZM88 48H80V56H88V48ZM88 72H80V80H88V72ZM104 104H96V112H104V104ZM104 144H96V152H104V144ZM112 40H104V48H112V40ZM112 152H104V160H112V152ZM120 0H112V8H120V0ZM120 32H112V40H120V32ZM120 48H112V56H120V48ZM128 16H120V24H128V16ZM136 0H128V8H136V0ZM136 64H128V72H136V64ZM152 64H144V72H152V64ZM152 144H144V152H152V144ZM176 192H168V200H176V192ZM200 64H192V72H200V64ZM16 160H40V184H16V160Z'
          }
        />
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={'M56 0H0V56H56V0ZM48 8H8V48H48V8Z'}
        />
        <path d={'M16 16H40V40H16V16Z'} />
        <path
          d={
            'M152 80H144V104H160V80H168V96H192V104H200V80H192V88H176V80H192V72H152V80Z'
          }
        />
        <path
          d={
            'M168 104H160V120H168V128H176V144H192V128H184V120H192V128H200V112H192V104H184V112H168V104Z'
          }
        />
        <path
          d={'M64 0V8H88V24H80V40H88V48H96V40H104V32H96V16H104V8H96V0H64Z'}
        />
        <path d={'M24 64V72H40V64H24Z'} />
        <path d={'M0 64V80H8V72H16V64H0Z'} />
        <path d={'M184 16V40H160V16H184Z'} />
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={'M184 16V40H160V16H184Z'}
        />
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={'M200 0H144V56H200V0ZM152 48V8H192V48H152Z'}
        />
        <path d={'M136 32H128V56H136V32Z'} />
        <path d={'M104 48H96V72H104V64H112V56H104V48Z'} />
        <path
          d={
            'M104 80H96V88H112V80H120V88H112V96H120V104H112V112H104V120H128V112H136V80H128V72H120V64H112V72H104V80Z'
          }
        />
        <path d={'M8 88H0V96H32V88H16V80H8V88Z'} />
        <path d={'M16 120H8V136H24V128H32V120H24V112H16V120Z'} />
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={'M152 144H144V152H152V144Z'}
        />
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={'M144 144H152V152H144V144Z'}
        />
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={'M0 200V144H56V200H0ZM8 192V152H48V192H8Z'}
        />
        <path d={'M120 176H112V192H120V176Z'} />
        <path
          d={
            'M64 176H72V184H64V200H96V192H88V184H96V192H104V160H96V152H88V168H96V176H80V160H64V176Z'
          }
        />
        <path
          d={
            'M136 192H128V200H144V192H168V184H176V192H192V200H200V168H184V176H160V184H136V192Z'
          }
        />
        <path d={'M200 144H192V160H200V144Z'} />
        <path d={'M72 48H64V64H72V72H80V56H72V48Z'} />
        <path d={'M64 80V88H80V80H64Z'} />
        <path d={'M112 16H104V32H112V16Z'} />
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={'M152 144H144V152H152V144Z'}
        />
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={
            'M40 112V104H56V96H32V120H40V128H48V120H56V128H72V136H64V144H80V152H88V144H96V136H104V144H112V136H128V152H120V160H112V168H120V176H128V168H136V176H152V168H168V128H160V120H152V128H144V112H136V128H104V120H96V128H80V112H88V96H64V104H56V112H40ZM64 112V120H72V112H64ZM136 136V160H160V136H136Z'
          }
        />
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={'M152 144H144V152H152V144Z'}
        />
      </Motion.svg>
    </div>
  )
}

export default QRCode
