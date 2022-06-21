import React from 'react'
import { Link } from '.'

export function ResponsiveNavLink({ method = 'get', as = 'a', href, active = false, children }) {
  return (
    <Link
      method={method}
      as={as}
      href={href}
      className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
        active
          ? 'border-theme-400 text-theme-700 bg-theme-50 focus:outline-none focus:text-theme-800 focus:bg-theme-100 focus:border-theme-700'
          : 'border-transparent text-chrome-500 hover:text-chrome-800 hover:bg-chrome-50 hover:border-chrome-300'
      } text-base font-medium focus:outline-none transition duration-150 ease-in-out`}
    >
      {children}
    </Link>
  )
}
