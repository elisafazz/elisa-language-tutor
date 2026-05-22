'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof Link> & {
  href: string
}

export default function OfflineNavigationLink({ href, onClick, ...props }: Props) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          event.preventDefault()
          window.location.assign(href)
        }
      }}
      {...props}
    />
  )
}
