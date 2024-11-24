import type { Metadata } from 'next'
import './main.css'

export const metadata: Metadata = {
  title: 'Forge Fitness',
  description: 'A serious fitness tracker'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
