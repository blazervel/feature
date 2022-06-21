import React from 'react'

export function Badge({ text, children, dot = false, className, ...props }) {

  return (
    <span {...props} className={`${className} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-theme-100 text-theme-800 dark:text-theme-200 dark:bg-theme-800 opacity-80 group-hover:opacity-100 hover:opacity-100`}>
      {dot && (
        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-theme-400" fill="currentColor" viewBox="0 0 8 8">
          <circle cx={4} cy={4} r={3} />
        </svg>
      )}
      {text}{children}
    </span>
  )
  
}
