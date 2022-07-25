import { ReactNode } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'

export default function PatientListStory() {
  return <div>Coming soon</div>
}

PatientListStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
