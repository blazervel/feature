import React from 'react'

export const Card = ({ xs = false, sm = false, lg = false, className, children }) => (
  <div className={`${className} w-full border rounded-xl border-chrome-200 dark:border-chrome-800 shadow p-4 sm:p-6`}>
    {children}
  </div>
)