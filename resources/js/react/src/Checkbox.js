import React from 'react'

export function Checkbox({ name, value, handleChange }) {
  return (
    <input
      type="checkbox"
      name={name}
      value={value}
      className="rounded border-chrome-300 text-theme-600 shadow-sm focus:border-theme-300 focus:ring focus:ring-theme-200 focus:ring-opacity-50"
      onChange={(e) => handleChange(e)}
    />
  )
}
