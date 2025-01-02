import Head from 'next/head'
import { getYear } from '@/lib/utils'
import React from 'react'

const PageHead = ({
  title,
  children,
}: {
  title?: string
  children?: React.ReactNode
}) => {
  const pageTitle = title
    ? `${title} | GeorgeCht ©${getYear()}`
    : `GeorgeCht ©${getYear()}`
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta
        name={'description'}
        content={'Front-end developer and designer, based in Greece.'}
      />
      <meta name={'author'} content={'George Cht'} />
      <meta
        name={'keywords'}
        content={
          'George Cht, George Chatziiordanou, design, web development, front-end, front, end, developer, dev, web, react, wordpress, portfolio, awwwards, greece, greek'
        }
      />
      <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
      <link rel={'icon'} href={'/favicon.svg'} />
      <meta property={'og:title'} content={'George Cht'} />
      <meta
        property={'og:description'}
        content={'Working at the intersection of web development & design'}
      />
      <meta property={'og:image'} content={'https://georgecht.com/share.jpg'} />
      <meta property={'og:url'} content={'https://georgecht.com'} />
      <meta name={'twitter:title'} content={'George Cht'} />
      <meta
        name={'twitter:description'}
        content={'Working at the intersection of web development & design'}
      />
      <meta
        name={'twitter:image'}
        content={'https://georgecht.com/share.jpg'}
      />
      <meta name={'twitter:card'} content={'summary_large_image'} />
      {children ? children : <React.Fragment />}
    </Head>
  )
}

export default PageHead
