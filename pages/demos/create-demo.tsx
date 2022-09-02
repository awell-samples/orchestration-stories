import { InformationCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'

import { Header } from '@/components/Layouts/atoms'
import { SEO } from '@/components/SEO'
import { useClipboard } from '@/hooks/useClipboard'

export default function CreateDemoPage() {
  const [customerName, setCustomerName] = useState('')
  const [customerLogoUrl, setCustomerLogoUrl] = useState('')
  const [customerColor, setCustomerColor] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [pathwayDefinitionId, setPathwayDefinitionId] = useState('')
  const [urlQuery, setUrlQuery] = useState('')

  const { copyFn } = useClipboard()

  const onGenerate = () => {
    const query = `?customerName=${customerName}&customerLogoUrl=${customerLogoUrl}&customerColor=${customerColor.substring(
      1
    )}&apiKey=${apiKey}&pathwayDefinitionId=${pathwayDefinitionId}`
    setUrlQuery(query)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Generate branded demo"
        url=""
        canonicalUrl=""
        preventCrawling={true}
      />
      <Header
        title="Helper to create a custom demo for hosted pathway"
        docsUrl="#"
        codeUrl="#"
        description="Easily create demo pages that are branded for the customer."
      />
      <div className="bg-slate-100/70 flex flex-col flex-grow">
        <div className="container my-16">
          <div className="mt-10 sm:mt-0">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="flex flex-col gap-y-8">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="apiKey"
                        className="block text-sm font-medium text-slate-700"
                      >
                        API Key
                      </label>
                      <input
                        type="text"
                        name="apiKey"
                        id="apiKey"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                      <p className="mt-2 text-sm text-slate-500">
                        We need the API Key of the tenant you want to demo in to
                        be able to interact with the Orchestration API. Note,
                        the demo only works with tenants in our Sandbox
                        environment.
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="pathway-definition-id"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Pathway definition id
                      </label>
                      <input
                        type="text"
                        name="pathway-definition-id"
                        id="pathway-definition-id"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                        onChange={(e) => setPathwayDefinitionId(e.target.value)}
                      />
                      <p className="mt-2 text-sm text-slate-500">
                        The pathway definition id of the pathway you want to
                        demo in the tenant the API Key is related to.
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Customer name
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        id="customerName"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                      <p className="mt-2 text-sm text-slate-500">
                        This only changes branding on the demo page. To change
                        the branding of the hosted pages, you still have to do
                        this in the pathway settings of the pathway you
                        specified above.
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Customer logo URL
                      </label>
                      <input
                        type="text"
                        name="customerLogo"
                        id="customerLogo"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                        onChange={(e) => setCustomerLogoUrl(e.target.value)}
                      />
                      <p className="mt-2 text-sm text-slate-500">
                        This only changes branding on the demo page. To change
                        the branding of the hosted pages, you still have to do
                        this in the pathway settings of the pathway you
                        specified above.
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Customer accent color
                      </label>
                      <input
                        type="text"
                        name="customerColor"
                        id="customerColor"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                        placeholder="#ffffff"
                        onChange={(e) => setCustomerColor(e.target.value)}
                      />
                      <p className="mt-2 text-sm text-slate-500">
                        This only changes branding on the demo page. To change
                        the branding of the hosted pages, you still have to do
                        this in the pathway settings of the pathway you
                        specified above.
                      </p>
                    </div>
                  </div>
                </div>
                {urlQuery && (
                  <div className="bg-white px-4 py-3 sm:px-6 pb-8">
                    <div className="rounded-md bg-blue-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <InformationCircleIcon
                            className="h-5 w-5 text-blue-400"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                          <p className="text-sm text-blue-700">
                            A unique URL was generated to render a demo page
                            with the branding you have defined.{' '}
                            <strong>
                              Tip: you can copy this URL and store it somewhere
                              so you don&apos;t have to refill this form
                              whenever you need to do the same demo.
                            </strong>
                          </p>
                          <p className="mt-3 text-sm md:mt-0 md:ml-6">
                            <a
                              href={`/demos/hosted-pathway${urlQuery}`}
                              className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                              onClick={() => copyFn(urlQuery)}
                            >
                              Go to demo page{' '}
                              <span aria-hidden="true">&rarr;</span>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="px-4 py-3 bg-slate-50 text-right sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => onGenerate()}
                  >
                    Generate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
