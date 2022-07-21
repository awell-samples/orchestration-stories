import { ReactNode } from 'react'

import {
  Dutch,
  English,
  French,
} from '../../components/Kiosk/Stages/Home/atoms/LanguageSelector/icons'

export const getLanguageIcon = (language: string): ReactNode => {
  let languageIcon = null

  switch (language) {
    case 'nl':
      languageIcon = <Dutch />
      break
    case 'fr':
      languageIcon = <French />
      break
    case 'en':
      languageIcon = <English />
      break
    default:
      throw new Error(
        `Couldn't find a language icon for language "${language}"`
      )
  }

  return languageIcon
}
