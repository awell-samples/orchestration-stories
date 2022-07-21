export const getLanguageLabel = (language: string): string => {
  let languageLabel = ''

  switch (language) {
    case 'nl':
      languageLabel = 'Nederlands'
      break
    case 'fr':
      languageLabel = 'Français'
      break
    case 'en':
      languageLabel = 'English'
      break
    default:
      throw new Error(
        `Couldn't find a language label for language "${language}"`
      )
  }

  return languageLabel
}
