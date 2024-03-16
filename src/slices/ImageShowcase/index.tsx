import React from 'react'
import Wrapper from './wrapper'
import PrismicImage from '@/components/ui/prismic-image'
import Section from '@/components/ui/section'

import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `MediaShowcase`.
 */
export type MediaShowcaseProps = SliceComponentProps<Content.MediaShowcaseSlice>

/**
 * Component for "MediaShowcase" Slices.
 */
const MediaShowcase = ({ slice }: MediaShowcaseProps): JSX.Element => {
  const ratio = isFilled.number(slice.primary.ratio)
    ? slice.primary.ratio
    : 16 / 9
  const distance = isFilled.number(slice.primary.distance)
    ? slice.primary.distance
    : 125
  const delay = isFilled.number(slice.primary.delay) ? slice.primary.delay : 0
  return (
    <Section
      withPadding
      withGap
      className={cn(
        'md:pb-3.5 pb-2.5',
        slice.variation !== 'default' && 'flex-col md:flex-row',
      )}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === 'default' ? (
        <PrismicImage
          image={slice.primary.image}
          ratio={ratio}
          responsiveRatio={1 / 1.1}
          distance={distance}
          delay={delay}
        />
      ) : (
        <Wrapper slice={slice}>
          <PrismicImage
            image={slice.primary.image}
            ratio={ratio}
            responsiveRatio={1 / 1.1}
            distance={distance}
            delay={delay}
          />
        </Wrapper>
      )}
    </Section>
  )
}

export default MediaShowcase
