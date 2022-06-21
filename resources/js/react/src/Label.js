import React from 'react'

export function Label({ forInput, value = '', className, children }) {
  return(
    <label htmlFor={forInput} className={`block font-medium text-sm text-chrome-700 dark:text-chrome-400 ` + className}>
      {value}{children}
    </label>
  )
}