import React from 'react'
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
  XIcon
} from '@heroicons/react/solid'

export function Alert({ type = 'warning', text }) {

  const colors = {
    warning: {wrapper: 'bg-yellow-50', icon: 'text-yellow-400', text: 'text-yellow-800', button: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-offset-yellow-50 focus:ring-yellow-600'},
    success: {wrapper: 'bg-green-50', icon: 'text-green-400', text: 'text-green-800', button: 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600'},
    danger: {wrapper: 'bg-red-50', icon: 'text-red-400', text: 'text-red-800', button: 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600'},
  }[type]

  const AlertIcon = {
    warning: ({ className }) => <InformationCircleIcon className={`${className} h-5 w-5`} aria-hidden="true" />,
    success: ({ className }) => <CheckCircleIcon className={`${className} h-5 w-5`} aria-hidden="true" />,
    danger: ({ className }) => <ShieldExclamationIcon className={`${className} h-5 w-5`} aria-hidden="true" />,
  }[type]

  return (
    <div className={`${colors.wrapper} rounded-md p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertIcon className={colors.icon} />
        </div>
        <div className="ml-3">
          <p className={`${colors.text} text-sm font-medium`}>{text}</p>
        </div>
        <div className="ml-auto pl-4">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              // onClick={() => setData}
              className={`${colors.button} inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}