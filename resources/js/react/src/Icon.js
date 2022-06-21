import React from 'react'

export const Icon = ({
  name,
  fw = false,
  sm = false,
  lg = false,
  className,
  ...props
}) => (
  <i
    className={`${className} fa-solid fa-${name} ${fw && 'fa-fw'} ${sm && 'fa-sm'} ${lg && 'fa-lg'}`}
    {...props}
    aria-hidden="true"></i>
)