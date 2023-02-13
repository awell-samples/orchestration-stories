import { ReactNode } from 'react'

import { FormView } from '@/components/AwellActivity/Form/FormView'
import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { useForm } from '@/hooks/awell-orchestration/useForm'

export default function EvaluateDisplayLogicStory() {
  const { form, loading } = useForm('_CDyYxr_fwYE')

  if (loading) {
    return <div>Loading</div>
  }

  console.log(form)

  return <FormView form={form} debug={true} />
}

EvaluateDisplayLogicStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
