import { ReactNode } from 'react'

import { ComingSoon } from '@/components/ComingSoon'
import { StoryLayout } from '@/components/Layouts/StoryLayout'

export default function TimelineStory() {
  return <ComingSoon />
}

TimelineStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
