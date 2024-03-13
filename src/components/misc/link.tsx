import Router from 'next/router'
import { useRouter } from 'next/navigation'
import NextLink, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, memo } from 'react'
import { useLenis } from '@/components/providers/lenis'

const Link = memo(
  (props: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const lenis = useLenis()
    const router = useRouter()

    return (
      <NextLink
        {...props}
        onClick={(e) => {
          e.preventDefault()
          router.push(props.href, { scroll: false })
          // Router.push(props.href).then(() => {
          // lenis?.scrollTo(0, {})
          // })
          // e.preventDefault()
          // if (
          //   (!props.target || props.target === '_slef') &&
          //   props.scroll !== false
          // ) {
          //   Router.push(props.href).then(() => {
          //     lenis?.scrollTo(0, {
          //       immediate: true,
          //     })
          //   })
          // }
        }}
      />
    )
  },
)

Link.displayName = 'Link'

export default Link
