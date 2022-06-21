import React from 'react'
import { Button } from '.'

export function NoneFound({ route, method = 'GET', ...props }) {
  return (
    <div className="flex justify-center items-center space-x-4 py-12 border-2 rounded-xl border-dashed border-chrome-200 dark:border-chrome-600" {...props}>
      <span className="text-chrome-500 font-medium text-sm">None yet...</span> 
      {route ? (
        <Button outline route={route} method={method}>Add one</Button>
      ) : ''}
    </div>
  )
}