import { type Activity } from '../../types/generated/api.types'
import { ApiCall } from './ApiCall'
import { FormContainer } from './Form'
import { Message } from './Message'

interface AwellActivityProps {
  activity: Activity
  patientId: string
  onActivityCompleted: () => void
}

export const AwellActivity = ({
  activity,
  patientId,
  onActivityCompleted,
}: AwellActivityProps) => {
  const type = activity.object.type

  if (type === 'FORM') {
    return (
      <FormContainer
        formActivity={activity}
        onActivityCompleted={onActivityCompleted}
      />
    )
  }

  if (type === 'MESSAGE') {
    return (
      <Message
        patientId={patientId}
        messageActivity={activity}
        onActivityCompleted={onActivityCompleted}
      />
    )
  }

  if (type === 'API_CALL') {
    return (
      <ApiCall
        apiCallActivity={activity}
        onActivityCompleted={onActivityCompleted}
      />
    )
  }

  return <div>{`Rendering activity of type ${type} is not yet supported.`}</div>
}
