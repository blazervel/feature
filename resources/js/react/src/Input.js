import React, { useRef, useEffect } from 'react'
import { Label } from '.'
import { mergeCssClasses } from '../../utils/src/css-classes'

export function Input({
  xs = false,
  sm = false,
  md = false,
  lg = false,
  type = 'text',
  className = '',
  name,
  id = '',
  label = '',
  value,
  autoComplete,
  required,
  handleChange,
  isFocused,
  ...props
}) {

  id = id || name

  let size = (xs && 'xs') || (sm && 'sm') || (md && 'md') || (lg && 'lg') || 'base',
      sizeClassNames = {
        xs:   [],
        sm:   [],
        base: [],
        md:   [],
        lg:   [],
      }

  className = mergeCssClasses(
    className, 
    sizeClassNames[size], 
    [
      'rounded-md',
      'shadow-sm',
      'border-chrome-300',
      'dark:border-chrome-700',
      'focus:border-theme-300',
      'focus:ring',
      'focus:ring-theme-200',
      'focus:ring-opacity-50',
      'bg-white',
      'dark:bg-chrome-800',
      'dark:text-white',
    ]
  )
  
  if (label.length) {
    className+= ' mt-1'
  }

  const input = useRef()

  useEffect(() => {
    if (isFocused) {
      input.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-col items-start">
      {label.length ? (
        <Label htmlFor={id}>{label}</Label>
      ) : ('')}
      <input
        ref={input}
        type={type}
        name={name}
        value={value}
        className={className}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => handleChange(e)}
        {...props}
      />
    </div>
  )
}
