import { useTranslation } from 'next-i18next'

import { useMarkMessageAsRead } from '../../../hooks/awell-orchestration/useMarkMessageAsRead'
import { useMessage } from '../../../hooks/awell-orchestration/useMessage'
import { type Activity } from '../../../types/generated/api.types'
import { KioskButton } from '../../Button/variants'
import { MessageSkeleton } from '../../Skeleton'

interface MessageProps {
  messageActivity: Activity
  patientId: string
  onActivityCompleted: () => void
}

export const Message = ({
  messageActivity,
  patientId,
  onActivityCompleted,
}: MessageProps) => {
  const { t } = useTranslation()

  const { message, loading } = useMessage({
    messageId: messageActivity.object.id,
  })
  const { markMessageAsRead } = useMarkMessageAsRead()

  const handleOnClick = async () => {
    const updatedMessageActivity = await markMessageAsRead({
      activityId: messageActivity.id,
      userId: patientId,
    })
    if (updatedMessageActivity.status === 'DONE') {
      onActivityCompleted()
    }
  }

  return (
    <div className="grow flex flex-col">
      <div className="container grow">
        {loading ? (
          <MessageSkeleton />
        ) : (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-slate-800 text-5xl">{message?.subject}</h1>
            <div
              className="awell-message"
              dangerouslySetInnerHTML={{ __html: message?.body || '' }}
            />
          </div>
        )}
      </div>
      <div className="">
        <KioskButton
          label={t('next_cta')}
          onClick={() => handleOnClick()}
          color="blue"
          disabled={loading ? true : false}
        />
      </div>
    </div>
  )
}
