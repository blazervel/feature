import React from 'react'
import { NoneFound, Link, Icon } from '.'

export function List({
  
  items,
  itemTitle = null,
  itemRoute,
  itemActions,

  headingIcon = '',
  heading = '',

  noneFoundRoute = null,

  className

}) {
  return (
    <div className={className}>

      {heading && (
          <h3 className="font-medium pb-5 flex items-center space-x-1">
            {headingIcon && (
              <Icon name={headingIcon} className="text-chrome-400 dark:text-chrome-600" />
            )}
            <span className="text-chrome-500">{heading}</span>
          </h3>
      )}

      <ul role="list" className="space-y-3">

        {items.length ? items.map(item => (

          <ListItem
            key={item.id} 
            item={item}
            itemTitle={itemTitle}
            itemRoute={itemRoute}
            itemActions={itemActions} 
            />

        )) : (
        
          <NoneFound route={noneFoundRoute} />
        
        )}

      </ul>

    </div>
  )
}

export const ListItem = ({ item, itemTitle, itemRoute, itemActions }) => {

  let ListItemWrapper = ({ href = null, children, ...props }) => (
    href ? (
      <Link href={href} {...props}>{children}</Link>
    ) : (
      <div {...props}>{children}</div>
    )
  )

  return (
    <li className="group rounded-xl bg-chrome-50 dark:bg-chrome-800 overflow-hidden">
      <ListItemWrapper href={itemRoute && itemRoute(item)} className="block hover:bg-chrome-50 dark:hover:bg-chrome-800 transition-colors">

        <div className="px-4 py-4 flex items-center sm:px-6">

          <div className="flex-1 font-medium text-chrome-500 group-hover:text-chrome-900 dark:group-hover:text-chrome-200 transition-colors truncate">
            {itemTitle !== null ? itemTitle(item) : (item.title || item.name)}
          </div>

          <div className="ml-5 flex-shrink-0">
            {itemActions ? itemActions(item) : (
              <Icon name="chevron-right" sm fw className="text-chrome-200 dark:text-chrome-700" />
            )}
          </div>

        </div>

      </ListItemWrapper>
    </li>
  )
}