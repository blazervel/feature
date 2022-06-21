import React from 'react'
import { Head, usePage } from '@inertiajs/inertia-react'
import { Sidebar, Topbar, Container, Alert } from '..'

export function Dashboard({
  pageTitle,
  sidebar = true,
  topbar = false,
  fullWidth = false,
  className,
  children,
  ...props
}) {
  
  const { navigation, alerts } = usePage().props

  const AlertMessage = () => {

    if (alerts.warning) {
      return (
        <div className="p-4">
          <Alert type="warning" text={alerts.warning} />
        </div>
      )
    }

    if (alerts.danger) {
      return (
        <div className="p-4">
          <Alert type="danger" text={alerts.danger} />
        </div>
      )
    }

    if (alerts.success) {
      return (
        <div className="p-4">
          <Alert type="success" text={alerts.success} />
        </div>
      )
    }

    return <></>
  }

  if (sidebar) {
    return (
      <div id="dashboard" className={`${className} bg-white dark:bg-chrome-900 min-h-screen`} {...props}>
        <Head title={pageTitle} />

        <Sidebar navigation={navigation}>
          {topbar && (
            <Topbar navigation={navigation} />
          )}
          
          <div className="flex justify-end">
            <AlertMessage />
          </div>

          <div className="py-12">
            {fullWidth ? children : (
              <Container>
                {children}
              </Container>
            )}
          </div>
        </Sidebar>
      </div>
    )
  }

  return (
    <div id="dashboard" className={`${className} bg-white dark:bg-chrome-900 min-h-screen flex flex-col`} {...props}>
      <Head title={pageTitle} />
      
      {topbar && (
        <Topbar navigation={navigation} />
      )}

      <div className="flex justify-end">
        <AlertMessage />
      </div>

      <div className="flex-1 flex items-center">
        {fullWidth ? children : (
          <Container>
            {children}
          </Container>
        )}
      </div>
    </div>
  )
}