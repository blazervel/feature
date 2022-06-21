import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ApplicationLogo, Link } from '.'
import { mergeCssClasses } from '../../utils/src/css-classes'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

export function Sidebar({ children, navigation }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const Navigation = () => (
    <nav className="mt-5 flex-1 px-2 space-y-3">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={mergeCssClasses(
            item.current && 'bg-chrome-100 text-chrome-900 dark:text-chrome-400 dark:bg-chrome-800',
            !item.current && 'text-chrome-500 hover:bg-chrome-50 hover:text-chrome-900 dark:text-chrome-600 dark:hover:bg-chrome-800 dark:hover:text-chrome-400',
            'group flex items-center px-2 py-1.5 font-medium rounded-lg transition-colors'
          )}
        >
          <i
            className={mergeCssClasses(
              `fa-solid fa-${item.icon} fa-fw`,
              item.current ? 'text-chrome-500 dark:text-chrome-600' : 'text-chrome-400 group-hover:text-chrome-500 dark:text-chrome-800 dark:group-hover:text-chrome-500',
              'mr-3 flex-shrink-0 transition-colors'
            )}
            aria-hidden="true"></i>

          <span className="-mb-0.5">
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  )

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-chrome-100 dark:bg-chrome-800 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col w-full bg-chrome-100 dark:bg-chrome-900">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  
                <ApplicationLogo
                  className="flex-shrink-0 px-4"
                  href={route('home')}
                  text="Roberta" />
                
                <Navigation />

              </div>

            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14"></div>
        </Dialog>
      </Transition.Root>

      <div className="relative hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        
        <div className="absolute inset-0 z-1 opacity-50 bg-gradient-to-r from-white to-chrome-50 dark:from-chrome-900 dark:to-chrome-800"></div>

        <div className="relative z-10 flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            
            <ApplicationLogo
              className="flex-shrink-0 px-4"
              href={route('home')}
              text="Roberta" />

            <Navigation />

          </div>
        </div>
      </div>

      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="h-12 w-12 inline-flex items-center justify-center rounded-md text-chrome-500 hover:text-chrome-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-500 bg-chrome-100 dark:bg-chrome-800"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1">
          {children}
        </main>
      </div>

    </div>
  )
}