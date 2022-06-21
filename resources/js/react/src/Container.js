import React from 'react'

export const Container = ({ xs = false, sm = false, lg = false, className, children }) => {
  
  let maxWidth = 'max-w-3xl'
  
  if (lg) {
    maxWidth = 'max-w-7xl' 
  } else if (sm) {
    maxWidth = 'max-w-xl' 
  } else if (xs) {
    maxWidth = 'max-w-md' 
  }

  const padding = 'px-4 sm:px-6 lg:px-8'

  return (
    <div className={`${className} ${padding} w-full max-w-7xl mx-auto`}>
      <div className={`${maxWidth} mx-auto`}>
        {children}
      </div>
    </div>
  )
}