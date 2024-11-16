export default function PageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="w-[90%] mx-auto mt-12 h-full pb-12">{children}</div>
}
