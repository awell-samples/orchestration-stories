import { ReactNode } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'

export default function PatientProfileStory() {
  return <div>Coming soon</div>
}

PatientProfileStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
