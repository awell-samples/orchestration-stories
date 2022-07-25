import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import ContentLoader from 'react-content-loader'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { usePatients } from '@/hooks/awell-orchestration/usePatients'

export default function PatientListStory() {
  const { pagination, patients, loading, fetchMore } = usePatients()
  const [currentPage, setCurrentPage] = useState(1)

  const loadNewData = (pageNumber: number) => {
    const newOffset = pagination.count * (pageNumber - 1)
    fetchMore({
      variables: {
        offset: newOffset,
      },
    })
  }

  const onNextPage = () => {
    const newCurrentPage = currentPage + 1
    setCurrentPage(newCurrentPage)
    loadNewData(newCurrentPage)
  }

  const onPreviousPage = () => {
    const newCurrentPage = currentPage - 1
    setCurrentPage(newCurrentPage)
    loadNewData(newCurrentPage)
  }

  const onPageClick = (pageNumber: number) => {
    const newCurrentPage = pageNumber
    setCurrentPage(newCurrentPage)
    loadNewData(newCurrentPage)
  }

  const totalNbrOfPages = Math.ceil(pagination.total_count / pagination.count)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Patients</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the patients in your tenant.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href="/stories/create-patient">
            <a
              target="_blank"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Create patient
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Patient id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading
                    ? [...Array(pagination.count)].map((pageNumber, i) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <ContentLoader
                              speed={2}
                              width={150}
                              height={20}
                              viewBox="0 0 150 20"
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                            >
                              <rect
                                x="0"
                                y="0"
                                rx="0"
                                ry="0"
                                width="150"
                                height="20"
                              />
                            </ContentLoader>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <ContentLoader
                              speed={2}
                              width={200}
                              height={20}
                              viewBox="0 0 200 20"
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                            >
                              <rect
                                x="0"
                                y="0"
                                rx="0"
                                ry="0"
                                width="200"
                                height="20"
                              />
                            </ContentLoader>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <ContentLoader
                              speed={2}
                              width={150}
                              height={20}
                              viewBox="0 0 150 20"
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                            >
                              <rect
                                x="0"
                                y="0"
                                rx="0"
                                ry="0"
                                width="150"
                                height="20"
                              />
                            </ContentLoader>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <ContentLoader
                              speed={2}
                              width={150}
                              height={20}
                              viewBox="0 0 150 20"
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                            >
                              <rect
                                x="0"
                                y="0"
                                rx="0"
                                ry="0"
                                width="150"
                                height="20"
                              />
                            </ContentLoader>
                          </td>
                        </tr>
                      ))
                    : patients.map((patient) => (
                        <tr key={patient.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {patient.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {patient.profile?.first_name ||
                            patient.profile?.last_name ? (
                              <span>
                                {patient.profile?.first_name}{' '}
                                {patient.profile?.last_name}
                              </span>
                            ) : (
                              <span>Anonymous</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {patient.profile?.email}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link href="#">
                              <a
                                target="_blank"
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Open profile
                              </a>
                            </Link>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{pagination.offset + 1}</span>{' '}
            to{' '}
            <span className="font-medium">
              {pagination.count * currentPage}
            </span>{' '}
            of <span className="font-medium">{pagination.total_count}</span>{' '}
            results
          </p>
        </div>
        <nav className="mt-4 border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
          <div className="-mt-px w-0 flex-1 flex">
            <button
              onClick={() => onPreviousPage()}
              disabled={currentPage === 1}
              className="disabled:cursor-not-allowed border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              <ArrowNarrowLeftIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Previous
            </button>
          </div>
          {!loading && (
            <div className="hidden md:-mt-px md:flex">
              {[...Array(totalNbrOfPages)].map((pageNumber, i) => (
                <div
                  key={i + 1}
                  onClick={() => onPageClick(i + 1)}
                  className={
                    currentPage === i + 1
                      ? 'cursor-pointer border-blue-500 text-blue-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
                      : 'cursor-pointer border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
                  }
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          <div className="-mt-px w-0 flex-1 flex justify-end">
            <button
              onClick={(e) => {
                e.preventDefault()
                onNextPage()
              }}
              disabled={currentPage === totalNbrOfPages}
              className="disabled:cursor-not-allowed border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Next
              <ArrowNarrowRightIcon
                className="ml-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

PatientListStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
