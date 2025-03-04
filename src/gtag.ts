export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''

// Send a pageview event to Google Analytics
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // @ts-expect-error - TODO: fix this
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Send custom events to Google Analytics
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}): void => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // @ts-expect-error - TODO: fix this
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
