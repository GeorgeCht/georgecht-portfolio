import React from 'react'
import Wrapper from './wrapper'
import PrismicVideo from '@/components/ui/prismic-video'
import Section from '@/components/ui/section'

import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `VideoShowcase`.
 */
export type VideoShowcaseProps = SliceComponentProps<Content.VideoShowcaseSlice>

/**
 * Component for "VideoShowcase" Slices.
 */
const VideoShowcase = ({ slice }: VideoShowcaseProps): JSX.Element => {
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
        <PrismicVideo
          src={slice.primary.video_url as string}
          ratio={ratio}
          distance={distance}
          delay={delay}
        />
      ) : (
        <Wrapper slice={slice}>
          <PrismicVideo
            src={slice.primary.video_url as string}
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

export default VideoShowcase
