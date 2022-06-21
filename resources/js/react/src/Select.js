import React from 'react'
import { Label } from "./Label"

export function Select({
  name,
  options = [],
  value,
  defaultValue = null,
  id = '',
  label = '',
  className = '',
  handleChange,
}) {

  id = id || name
  
  if (label.length) {
    className+= ' mt-1'
  }

  options = Array.isArray(options) ? options : Object.entries(options)

  return (
    <div>
      {label.length ? (
        <Label htmlFor={id}>{label}</Label>
      ) : ('')}
      <select
        id={id}
        name={name}
        className={`${className} block w-full pl-3 pr-10 py-2 h-11 text-base border-chrome-300 dark:border-chrome-700 bg-white dark:bg-chrome-800 dark:text-white focus:outline-none focus:ring-theme-500 focus:border-theme-500 sm:text-sm rounded-md`}
        defaultValue={value || defaultValue}
        onChange={(e) => handleChange(e)}
      >
        <option key="empty" value="">Choose One</option>

        {options.map(option => typeof option[1] === 'object' ? (
          <optgroup key={option[0]} label={option[0]}>
            {option[1].map(groupOption => (
              <option
                key={`${option[0]}_${groupOption}`}
                value={`${option[0]}_${groupOption}`}>{groupOption}</option>
            ))}
          </optgroup>
        ) : (
          <option key={option[1]} value={option[1]}>{option[0]}</option>
        ))}

      </select>
    </div>
  )
}
