import React from 'react'
import { mergeCssClasses } from '../../utils/src/css-classes'
import { Inertia } from '@inertiajs/inertia'
import { useForm } from '@inertiajs/inertia-react'
import { Link, ValidationErrors } from '.'

function ButtonBase({
  xs = false,
  sm = false,
  md = false,
  lg = false,
  type = 'button',
  className = '',
  ...props
}) {
  
  const size = (xs && 'xs') || (sm && 'sm') || (md && 'md') || (lg && 'lg') || 'base',
        sizeClassNames = {
          xs:   ['px-2.5', 'py-1.5', 'text-xs'],
          sm:   ['px-3',   'py-2',   'text-sm', 'leading-4'],
          base: ['px-4',   'py-2',   'text-sm'],
          md:   ['px-4',   'py-2',   'text-base'],
          lg:   ['px-6',   'py-3',   'text-base'],
        }

  className = mergeCssClasses(
    className, 
    sizeClassNames[size],
    [
      'inline-flex',
      'items-center',
      'border',
      'font-medium',
      'rounded-md',
      'shadow-sm',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
    ]
  )

  return (
    <ButtonElement type={type} className={className} {...props}>
      {props.children}
    </ButtonElement>
  )

}

export function ButtonPrimary({
  className = '',
  outline = false,
  text = '',
  children,
  ...props
}) {

  className = mergeCssClasses(
    className, 
    outline ? [
      'border-theme-200',
      'text-theme-500'
    ] : [
      'border-transparent',
      'text-theme-300',
      'bg-theme-700',
      'hover:bg-theme-800',
      'hover:text-theme-100',
    ],
    [
      'transition-colors',
      'focus:ring-theme-500',
    ]
  )

  return (
    <ButtonBase className={className} {...props}>
      {text}{children}
    </ButtonBase>
  )
}

export function Button({
  className = '',
  outline = false,
  text = '',
  children,
  ...props
}) {

  className = mergeCssClasses(
    className, 
    outline ? [
      // Border Color
      'border-chrome-200',
      'dark:border-chrome-800',
      // Text Color
      'text-chrome-500',
      'dark:border-chrome-800'
    ] : [
      // Border Color
      'border-chrome-300',
      'dark:border-transparent',
      // Text Color
      'text-chrome-700',
      'dark:text-white',
      // BG Color
      'bg-white',
      'dark:bg-chrome-600',
      // Hover BG Color
      'hover:bg-chrome-50',
      'dark:hover:bg-chrome-700',
    ],
    [
      'focus:ring-chrome-500',
      'dark:focus:ring-offset-chrome-800',
    ]
  )

  return (
    <ButtonBase className={className} {...props}>
      {text}{children}
    </ButtonBase>
  )
}

function ButtonElement({
  children,
  route = '',
  data = {},
  only = [],
  method = 'GET',
  ...props
}) {

  if (!route.length) {
    return (
      <button {...props}>{children}</button>
    )
  }

  if (method === 'GET') {
    return (
      <Link href={route} {...props}>{children}</Link>
    )
  }

  const { post, processing, errors } = useForm()

  const submit = (e) => {
    e.preventDefault()

    let options = {}

    if (only.length) {
      options.only = only
      options.replace = true
    }

    Inertia.post(route, data, options)
  }

  props.type = 'submit'

  return (
    <form onSubmit={submit}>
      <ValidationErrors errors={errors} />
      <button {...props}>{children}</button>
    </form>
  )
}