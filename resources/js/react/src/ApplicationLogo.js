import React from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { Link } from '.'

export function ApplicationLogo({ text = false, href = null, lg = false, className, children }) {
  return (
    <>
      <ApplicationLogoWrapper href={href} className={`group flex items-center space-x-2 ${className}`}>
        <span className={`${lg ? 'p-2' : 'p-1.5'} bg-gradient-to-r from-theme-400 to-theme-300 text-theme-600 rounded-lg inline-flex`}>
          <HeartIcon className={lg ? 'h-8 w-8' : 'h-4 w-4'} />
        </span>
        {text && (
          <span className="font-bold text-theme-300 group-hover:text-theme-600 dark:text-theme-600 dark:group-hover:text-theme-400 transition-colors">
            {text}
          </span>
        )}
      </ApplicationLogoWrapper>
    </>
  )
}

function ApplicationLogoWrapper({ href = null, children, ...props }) {
  return (
    <>
      {href ? (
        <Link href={href} {...props}>{children}</Link>
      ) : (
        <div {...props}>{children}</div>
      )}
    </>
  )
}