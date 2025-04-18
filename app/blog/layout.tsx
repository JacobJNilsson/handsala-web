"use client"

import { ReactNode } from "react"

export default function BlogPageLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}
