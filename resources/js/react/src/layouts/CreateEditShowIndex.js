import React from 'react'
import { Dashboard } from './Dashboard'
import {
  PageHeader,
  Container,
  Button,
  Card,
  List,
  Form
} from '..'

export const FormLayout = ({

  pageTitle,
  pageSuperHeading,
  pageHeading,
  pageActions,

  formRoute,
  formMethod,
  formFields,
  formSubmitButtonText,

  children,

}) => (
  <Dashboard pageTitle={pageTitle} {...props}>

    <Container sm>

      <Card>

        <PageHeader
          superHeading={pageSuperHeading}
          heading={pageHeading || pageTitle}
          actions={pageActions}
          sm />

        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
        
        <Form
          className="mt-8"
          route={formRoute}
          method={formMethod}
          fields={formFields}
          formSubmitButtonText={formSubmitButtonText} />

      </Card>

    </Container>

  </Dashboard>
)

export const CreateLayout = ({ formSubmitButtonText, ...props }) => (
  <FormLayout formSubmitButtonText={formSubmitButtonText || 'Create'} {...props} />
)

export const EditLayout = ({ formSubmitButtonText, ...props }) => (
  <FormLayout formSubmitButtonText={formSubmitButtonText || 'Save'} {...props} />
)

export const IndexLayout = ({
  
  pageTitle,
  pageSuperHeading,
  pageHeading,
  pageActions,
  
  items,
  itemsNoneFoundRoute,
  itemTitle,
  itemRoute,
  itemActions,

  children,

  ...props

}) => (
  <Dashboard pageTitle={pageTitle} {...props} {...props}>

    <PageHeader
      superHeading={pageSuperHeading}
      heading={pageHeading || pageTitle}
      actions={pageActions} />

    {children && (
      <div className="mt-8">
        {children}
      </div>
    )}

    <List
      className="mt-8"
      items={items}
      itemTitle={itemTitle}
      itemRoute={itemRoute}
      itemActions={itemActions}
      noneFoundRoute={itemsNoneFoundRoute} />

  </Dashboard>
)

export function ShowLayout({

  pageTitle,
  pageSuperHeading,
  pageHeading,
  pageActions,

  item,
  itemTitle,
  itemEditRoute,
  itemFields,

}) {
  return (
    <Dashboard pageTitle={itemTitle} {...props}>

      <PageHeader
        superHeading={pageSuperHeading}
        heading={pageHeading || pageTitle}
        actions={pageActions || (
          <Button route={itemEditRoute} text="Edit" />
        )} />

      <div>
        <div className="mt-5 border-t border-chrome-200 dark:border-chrome-800">
          <dl className="sm:divide-y sm:divide-chrome-200 dark:sm:divide-chrome-800">
            {itemFields.map(field => (
              <div key={field} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-chrome-500">{field}</dt>
                <dd className="mt-1 text-sm text-chrome-900 dark:text-chrome-100 sm:mt-0 sm:col-span-2">
                  {item[field.toLocaleLowerCase().replace(' ', '_')]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

    </Dashboard>
  )
}