interface HostedPageIframeProps {
  url: string
}

export const HostedPageIframe = ({ url }: HostedPageIframeProps) => {
  return (
    <iframe
      src={url}
      className="w-2/3 min-h-[500px] mx-auto"
      title="Awell Hosted Page"
    />
  )
}
