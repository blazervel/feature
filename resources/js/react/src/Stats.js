import React from 'react'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { Link } from '.'
import { conditionalClassNames } from '../../utils/src/css-classes'

export function Stats({ stats, ...props }) {

  return (

    <div {...props}>
      <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">

        {stats.map((item) => (

          <div key={item.id} className="relative px-4 pt-5 pb-12 overflow-hidden bg-white rounded-lg shadow sm:pt-6 sm:px-6">

            <dt>
              <div className="absolute p-3 bg-theme-500 rounded-md">
                <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div className="ml-16 text-sm font-medium text-chrome-500 truncate">
                {item.name}
              </div>
            </dt>

            <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
              <div className="text-2xl font-semibold text-chrome-900">{item.stat}</div>
              <div
                className={conditionalClassNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon className="self-center flex-shrink-0 w-5 h-5 text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowSmDownIcon className="self-center flex-shrink-0 w-5 h-5 text-red-500" aria-hidden="true" />
                )}
                <div className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</div>
                {item.change}
              </div>
              <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-chrome-50 sm:px-6">
                <div className="text-sm">
                  <Link href={item.route} className="font-medium text-theme-600 hover:text-theme-500">
                    {' '}
                    View all <div className="sr-only"> {item.name} stats</div>
                  </Link>
                </div>
              </div>
            </dd>

          </div>

        ))}

      </dl>

    </div>
  )
}
