import React from 'react'

export const Invoice = ({
  columns,
  items,
  footerTitle = 'Totals',
  footerColumns,
  className
}) => (

  <div className={`${className} -mx-4 flex flex-col sm:-mx-6 md:mx-0 border-t border-chrome-200 dark:border-chrome-700`}>
    <table className="min-w-full divide-y divide-chrome-200 dark:divide-chrome-700">

      <thead className="sticky z-10 top-0 bg-white dark:bg-chrome-900 bg-opacity-75 backdrop-blur backdrop-filter">
        <tr>
          {columns.map((column, i) => (
            <th
              key={column.name}
              scope="col"
              className={`${i > 0 ? "text-right" : "text-left"} text-sm sm:text-base py-3.5 px-3 font-semibold text-chrome-500`}
            >{column.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {items.map((item, i) => (
          <tr key={item.id} className="group border-b border-chrome-200 dark:border-chrome-700 hover:bg-chrome-200 dark:hover:bg-chrome-800">
            {columns.map((column, i) => (
              <td key={`${item.id}_${column.name}`} className={`${i > 0 ? "text-right" : "text-left"} py-3.5 px-3 text-right dark:text-chrome-300`}>
                {item[column.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

      <tfoot className="sticky bottom-0 bg-white dark:bg-chrome-900 bg-opacity-75 backdrop-blur backdrop-filter">
        <tr>
          <td className="text-left py-3.5 px-3 dark:text-white">
            {footerTitle}
          </td>
          {footerColumns.map((footerColumn, i) => (
            <td key={footerColumn.name} className="text-right py-3.5 px-3 dark:text-white">
              {footerColumn.label}
            </td>
          ))}
        </tr>
      </tfoot>

    </table>
  </div>

)