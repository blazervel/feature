import React, { useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox as ComboboxHeadless } from '@headlessui/react'
import { mergeCssClasses } from '../../utils/src/css-classes'

export function Combobox({ label, options, handleChange }) {
  
  const [query, setQuery] = useState('')
  const [selectedOption, setSelectedOption] = useState()

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <ComboboxHeadless as="div" value={selectedOption} onChange={(event) => { handleChange(event); setSelectedOption(event) }}>
      
      {label && (
        <ComboboxHeadless.Label className="block text-sm font-medium text-chrome-700">{label}</ComboboxHeadless.Label>
      )}
      
      <div className={`relative ${label && 'mt-1'}`}>

        <ComboboxHeadless.Input
          className="w-full rounded-md border border-chrome-200 dark:text-white dark:border-chrome-700 bg-white dark:bg-chrome-800 py-2 pl-3 pr-10 shadow-sm focus:border-theme-500 focus:outline-none focus:ring-1 focus:ring-theme-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option) => option && option.name}
        />

        <ComboboxHeadless.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-chrome-500" aria-hidden="true" />
        </ComboboxHeadless.Button>

        {filteredOptions.length > 0 && (
          <ComboboxHeadless.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-chrome-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <ComboboxHeadless.Option
                key={option.id}
                value={option}
                className={({ active }) =>
                  mergeCssClasses(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-theme-600 text-white' : 'dark:text-white'
                  )
                }
              >
                {({ active, selected }) => (
                  <>

                    <span className={mergeCssClasses('block truncate', selected && 'font-semibold')}>
                      {option.name}
                    </span>

                    {selected && (
                      <span
                        className={mergeCssClasses(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-theme-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}

                  </>
                )}
              </ComboboxHeadless.Option>
            ))}
          </ComboboxHeadless.Options>
        )}
      </div>
    </ComboboxHeadless>
  )
}