'use client'

import {
  MouseEventHandler,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Engine, Render, Bodies, World, Runner } from 'matter-js'
import Pill from '@/components/new/button-pill'
import Link from 'next/link'
import { debounce, deltaDiff, wait } from '@/lib/utils'

const MatterMenu = ({
  onClick,
  setIsOpen,
}: {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: SetStateAction<boolean>) => void
}) => {
  const [documentBody, setDocumentBody] = useState<HTMLElement | null>(null)
  const [canHover, setCanHover] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const scene = useRef<HTMLDivElement>(null)
  const engine = useRef(Engine.create())
  const menuItems = [
    {
      title: 'Projects',
      href: '/projects',
      ref: useRef<HTMLDivElement>(null),
      deltaX: 0.6275,
    },
    {
      title: 'About',
      href: '/about',
      ref: useRef<HTMLDivElement>(null),
      deltaX: 0.4355,
    },
    {
      title: 'Archive',
      href: '/archive',
      ref: useRef<HTMLDivElement>(null),
      deltaX: 0.5235,
    },
    {
      title: 'Contact',
      href: '/contact',
      ref: useRef<HTMLDivElement>(null),
      deltaX: 0.5775,
    },
  ]

  useEffect(() => {
    const clientWidth = document.body.clientWidth
    const clientHeight = document.body.clientHeight
    document !== undefined && setWindowWidth(document.body.clientWidth)
    setDocumentBody(document.body)

    const render = Render.create({
      element: scene.current!,
      engine: engine.current,
      options: {
        width: clientWidth,
        height: clientHeight,
        wireframes: false,
        background: 'transparent',
      },
    })

    const generateBox = (
      deltaX: number,
      deltaY: number,
      indexShift: number,
    ) => {
      const clientWidth = document.body.clientWidth
      return Bodies.rectangle(
        (clientWidth * deltaX) / 2 + 16 + Math.random() * 1 + 20,
        (clientWidth * deltaY) / 2 -
          666 +
          clientWidth * deltaY * (indexShift - 0.875) +
          Math.random() * 50 +
          150,
        clientWidth * deltaX,
        clientWidth * deltaY,
        {
          friction: 0.05,
          frictionAir: 0.005,
          frictionStatic: 0.05,
          restitution: 0.995,
          density: 0.5,
          mass: 0,
          angle: Math.random() * 0.15 - 0.15,
          render: {
            fillStyle: 'transparent',
          },
        },
      )
    }

    const createBox = (
      deltaX: number,
      indexShift: number,
      ref: RefObject<HTMLDivElement>,
    ) => {
      return {
        w:
          clientWidth >= 768
            ? clientWidth * deltaX
            : clientWidth * deltaX * 1.5,
        h: clientWidth >= 768 ? clientWidth * 0.109 : clientWidth * 0.169,
        body: generateBox(
          clientWidth >= 768 ? deltaX : deltaX * 1.5,
          clientWidth >= 768 ? 0.109 : 0.169,
          indexShift,
        ),
        elem: ref.current,
        render() {
          const { x, y } = this.body.position
          if (ref.current !== null) {
            ref.current.style.top = `${y - this.h / 2}px`
            ref.current.style.left = `${x - this.w / 2}px`
            ref.current.style.transform = `rotate(${this.body.angle}rad)`
          }
        },
      }
    }

    const boxes = menuItems.map((item, index) =>
      createBox(item.deltaX, index, item.ref),
    )

    const handleResize = () => {
      if (deltaDiff(clientWidth, windowWidth) >= 200) {
        setIsOpen((state) => !state)
        setWindowWidth(document.body.clientWidth)
      }
    }
    window.addEventListener('resize', debounce(handleResize, 200))

    World.add(engine.current.world, [
      Bodies.rectangle(clientWidth / 2, window.innerHeight, clientWidth, 10, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
        },
      }),
      Bodies.rectangle(clientWidth, clientHeight / 2, 20, clientHeight, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
        },
      }),
      Bodies.rectangle(0, clientHeight / 2, 20, clientHeight, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
        },
      }),
      ...boxes.map((item) => item.body),
    ])

    Runner.run(engine.current)
    // @ts-expect-error
    engine.current.gravity.y = 0.095

    Render.run(render)
    ;(function rerender() {
      boxes.forEach((box) => box.render())
      Engine.update(engine.current)
      requestAnimationFrame(rerender)
    })()

    wait(1275).then(() => setCanHover(true))

    return () => {
      Render.stop(render)
      World.clear(engine.current.world, false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Engine.clear(engine.current)
      render.canvas.remove()
      // @ts-expect-error
      render.canvas = null
      // @ts-expect-error
      render.context = null
      render.textures = {}
      window.removeEventListener('resize', debounce(handleResize, 200))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav className={'relative'}>
      <div ref={scene} className={'w-full h-dvh'} onClick={onClick} />
      {menuItems.map((item, index) => (
        <Link href={item.href} key={index} scroll={false}>
          <Pill.Matter
            key={index}
            ref={item.ref}
            onClick={onClick}
            canHover={canHover}
            innerText={item.title}
            style={{
              width: `calc(${documentBody?.clientWidth! >= 768 ? item.deltaX * 10 : item.deltaX * 15}*10vw)`,
            }}
            className={'absolute h-[calc(10vw*1.69)] md:h-[calc(10vw*1.09)]'}
          />
        </Link>
      ))}
    </nav>
  )
}

export default MatterMenu
