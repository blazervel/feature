import React from 'react'
import { Dashboard, Card, Container, ApplicationLogo } from '..'

export function Auth({ children, className, ...props }){
  return (
    <>
      <Dashboard className={`${className} bg-gradient-to-b from-theme-100 to-chrome-50 dask:to-chrome-900`} {...props} sidebar={false} topbar={false}>
        <Container xs>

          <div className="flex justify-center">
            <ApplicationLogo lg />
          </div>

          <Card className="mt-6">
            {children}
          </Card>

        </Container>
      </Dashboard>
    </>
  )
}