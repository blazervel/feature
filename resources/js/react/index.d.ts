import * as React from 'react'

type BlazervelBadgeProps = {
  text: string
  children?: any
  dot?: boolean
}

type BlazervelBadge = React.FunctionComponent<BlazervelBadgeProps>

export const Badge: BlazervelBadge