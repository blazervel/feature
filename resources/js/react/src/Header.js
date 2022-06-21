import React from 'react'
import { Icon, Button, ButtonPrimary } from '.'

export function SectionHeader({
  icon,
  superHeading,
  heading,
  children,
  actions,
  sm = false,
  lg = false,
  xl = false,
  className,
  ...props
}) {

  return (
    <div className={`${className} md:flex md:items-center md:justify-between`} {...props}>

      {icon && (
        <div className="pr-3">
          <div className="rounded-lg flex items-center justify-center h-10 w-10 bg-chrome-50 dark:bg-chrome-800">
            <Icon name={icon} lg={lg || xl} className="text-chrome-400 dark:text-chrome-600" />
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">

        {superHeading && (
          <div className="uppercase tracking-wider text-[0.6rem] font-medium text-chrome-400 dark:text-chrome-600">
            {superHeading}
          </div>
        )}

        <h2 className={`${sm && 'text-sm sm:text-base'} ${lg && 'text-xl sm:text-2xl'} ${xl && 'text-2xl sm:text-3xl'} ${!(sm || lg || xl) && 'sm:text-xl'} font-medium leading-7 text-chrome-900 dark:text-chrome-100 sm:truncate`}>
          {heading}
          {children}
        </h2>

      </div>
      
      {actions && (
        <div className="flex-shrink-0 mt-4 md:mt-0 pl-0 md:pl-4 space-x-3">
          {Array.isArray(actions) ? actions.map(({ primary, ...actionProps }, i) => (primary || false) === true ? (
            <ButtonPrimary key={encodeURI(actionProps.route)} {...actionProps} />
          ) : (
            <Button key={encodeURI(actionProps.route)} {...actionProps} />
          )) : (
            actions
          )}
        </div>
      )}

    </div>
  )
}

export const PageHeader = ({ ...props }) => (
  <SectionHeader lg {...props} />
)