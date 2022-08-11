import { ReactNode } from 'react'

import { ComingSoon } from '@/components/ComingSoon'
import { StoryLayout } from '@/components/Layouts/StoryLayout'

export default function SearchPatientStory() {
  return <ComingSoon />
}

SearchPatientStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
