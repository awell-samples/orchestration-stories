import { ReactNode } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'

export default function ConversationalFormStory() {
  return <div>Coming soon</div>
}

ConversationalFormStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
