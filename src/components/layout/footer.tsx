import React from 'react'
import type { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

// https://prismic.io/docs/typescript-nextjs
const Footer2 = ({ page }: PageProps) => {
  return (
    <React.Fragment>
      <h1>{page.uid}</h1>
      <p>{page.data.email}</p>
      {page.data.social_links.map((link, index) => (
        <PrismicNextLink key={index} field={link.url}>
          {link.title}
        </PrismicNextLink>
      ))}
    </React.Fragment>
  )
}

export default Footer2

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData })

  const page = await client.getSingle('footer')
  // const page = await client.getByUID('page', 'home')

  return {
    props: { page },
  }
}
