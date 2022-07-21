import { useTranslation } from 'next-i18next'

export const useGreeting = (): { greeting: string } => {
  const { t } = useTranslation()
  const d = new Date()
  const time = d.getHours()

  let greeting = 'Welcome'

  if (time < 12) {
    greeting = t('good_morning')
  }
  if (time > 12 && time < 18) {
    greeting = t('good_afternoon')
  }
  if (time > 18) {
    greeting = t('good_evening')
  }

  return { greeting }
}
