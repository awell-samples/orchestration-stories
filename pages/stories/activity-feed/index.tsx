import { ReactNode } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'

export default function ActivityFeedStory() {
  return <div>Coming soon</div>
}

ActivityFeedStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
