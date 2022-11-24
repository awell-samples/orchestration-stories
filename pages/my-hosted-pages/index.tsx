import { CreateHostedPages } from '@/components/CreateHostedPages'
import { CreateHostedPagesProvider } from '@/components/CreateHostedPages/context'

export default function MyHostedPages() {
  return (
    <CreateHostedPagesProvider>
      <CreateHostedPages />
    </CreateHostedPagesProvider>
  )
}
