"use client"

import { ReactNode } from "react"
import PageTransition from "../../components/ui/transition/PageTransition"

export default function BlogPageLayout({
  children,
}: {
  children: ReactNode
}) {
  return <PageTransition>{children}</PageTransition>
}
