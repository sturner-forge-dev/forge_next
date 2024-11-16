export default function PageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="px-4 sm:px-6 lg:px-8 mt-12">{children}</div>
}
