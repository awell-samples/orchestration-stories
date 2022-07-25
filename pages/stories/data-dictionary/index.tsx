import { ReactNode } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'

export default function DataDictionaryStory() {
  return <div>Coming soon</div>
}

DataDictionaryStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
