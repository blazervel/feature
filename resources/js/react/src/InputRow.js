import React from 'react'
import { Label, Input } from '.'

export function InputRow({ label, name, className, errors = [], ...props }) {
  return (
    <div className={className}>
      {label && (
        <Label className="form-label" htmlFor={name}>
          {label}:
        </Label>
      )}
      <Input
        id={name}
        name={name}
        {...props}
        className={`form-input ${errors.length ? 'error' : ''}`}
      />
      {errors && <div className="form-error">{errors}</div>}
    </div>
  )
}