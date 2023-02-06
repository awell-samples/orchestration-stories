import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { usePatients } from '@/hooks/awell-orchestration/usePatients'

const generatePagination = (totalPages: number, currentPage: number) => {
  const pagination = []

  // If there are only 7 pages or less in total, just display all pages without "..."
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(i)
    }

    return pagination
  }
  // ELSE display with ...
  else {
    // Always print first page button
    pagination.push(1)

    // Print "..." if currentPage is > 3
    if (currentPage > 3) {
      pagination.push('...')
    }

    // special case where last page is selected...
    // Without this special case, only 2 buttons would be shown after ... if you were on last page
    if (currentPage == totalPages) {
      pagination.push(currentPage - 2)
    }

    // Print previous number button if currentPage > 2
    if (currentPage > 2) {
      pagination.push(currentPage - 1)
    }

    //Print current page number button as long as it not the first or last page
    if (currentPage != 1 && currentPage != totalPages) {
      pagination.push(currentPage)
    }

    //print next page number button if currentPage < lastPage - 1
    if (currentPage < totalPages - 1) {
      pagination.push(currentPage + 1)
    }

    // special case where first page is selected...
    // Without this special case, only 2 buttons would be shown before ... if you were on first page
    if (currentPage == 1) {
      pagination.push(currentPage + 2)
    }

    //print "..." if currentPage is < lastPage -2
    if (currentPage < totalPages - 2) {
      pagination.push('...')
    }

    //Always print last page button if there is more than 1 page
    if (totalPages > 1) {
      pagination.push(totalPages)
    }

    return pagination
  }
}

export default function PatientListStory() {
  const { pagination, patients, loading, fetchMore, refetchPatients } =
    usePatients()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState<string | null>(null)

  useEffect(() => {
    if (searchTerm !== null) {
      const delayDebounceFn = setTimeout(() => {
        refetchPatients({ search: searchTerm ?? '' })
      }, 750)

      return () => clearTimeout(delayDebounceFn)
    }
  }, [searchTerm, refetchPatients])

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
  const paginationNumbers = generatePagination(totalNbrOfPages, currentPage)

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
            <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
              Create patient
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="mb-4 w-1/4">
          <input
            type="text"
            id="searchTerm"
            placeholder="Search patient"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
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
                            <div className="animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
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
                            <Link
                              href={`/stories/patient-profile?patientId=${patient.id}`}
                            >
                              <a className="text-blue-600 hover:text-blue-900">
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
              {paginationNumbers.map((pageNumber, i) => (
                <div key={i}>
                  {typeof pageNumber === 'number' ? (
                    <div
                      onClick={() => onPageClick(pageNumber)}
                      className={
                        currentPage === pageNumber
                          ? 'cursor-pointer border-blue-500 text-blue-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
                          : 'cursor-pointer border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
                      }
                    >
                      {pageNumber}
                    </div>
                  ) : (
                    <div className="cursor-default border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                      ...
                    </div>
                  )}
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
