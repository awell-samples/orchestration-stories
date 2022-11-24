import { useContext } from 'react'

import { CreateHostedPagesContext } from '../../context'

const steps = [
  { id: 'Step 1', name: 'Environment', href: '#' },
  { id: 'Step 2', name: 'Care flow', href: '#' },
  { id: 'Step 3', name: 'Your hosted page', href: '#' },
]

export const Stepper = () => {
  const { currentStage, goToStage } = useContext(CreateHostedPagesContext)

  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            {/* Completed stages */}
            {currentStage > index ? (
              <a
                href={step.href}
                onClick={() => goToStage(index)}
                className="group flex flex-col border-l-4 border-blue-600 py-2 pl-4 hover:border-blue-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-sm font-medium text-blue-600 group-hover:text-blue-800">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : // Current stage
            currentStage === index ? (
              <a
                href={step.href}
                className="flex flex-col border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                aria-current="step"
              >
                <span className="text-sm font-medium text-blue-600">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0 cursor-not-allowed"
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
