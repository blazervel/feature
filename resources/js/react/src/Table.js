import React from 'react'
import { Checkbox, Button } from '.'

export function Table({
  items,
  itemColumns,
  itemActions
}) {
  
  let checkedItems = []

  return (
    <>
      {items.length > 0 && (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5">

              {checkedItems.length > 0 && (
                <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-chrome-50 sm:left-16">
                  <Button text="Bulk Edit" />
                  <Button text="Delete All" />
                </div>
              )}

              <table className="min-w-full table-fixed divide-y divide-chrome-300 dark:divide-chrome-700">

                <thead className="bg-chrome-50 dark:bg-chrome-700">
                  <tr>
                    <th scope="col" className="relative min-w-[2rem]">
                      <Checkbox
                        // ref={checkbox}
                        // checked={checked}
                        // onChange={toggleAll}
                      />
                    </th>
                    {itemColumns.map((column, i) => (
                      <th key={column.name} scope="col" className="px-4 py-3.5 text-left font-medium text-chrome-900 dark:text-chrome-200">
                        {column.label}
                      </th>
                    ))}
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-chrome-200 dark:divide-chrome-700">
                  {items.map((item) => (
                    <tr key={item.id} className={classNames(
                      'group',
                      checkedItems.includes(item) ? 'bg-chrome-50 dark:bg-chrome-800' : 'hover:bg-chrome-50 dark:hover:bg-chrome-800'
                    )}>
                      <td className="relative min-w-[2rem]">
                        {checkedItems.includes(item) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-theme-600" />
                        )}
                        <Checkbox
                          value={item.id}
                          // checked={checkedItems.includes(item)}
                          // onChange={(e) =>
                          //   setSelectedTransactions(
                          //     e.target.checked
                          //       ? [...checkedItems, item]
                          //       : checkedItems.filter((p) => p !== item)
                          //   )
                          // }
                        />
                      </td>
                      {itemColumns.map((column, i) => (
                        <td key={column.name} className="whitespace-nowrap px-4 py-3.5 text-sm text-chrome-600 dark:text-chrome-400">
                          {item[column.name]}
                        </td>
                      ))}
                      {itemActions && (
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                          {itemActions}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}