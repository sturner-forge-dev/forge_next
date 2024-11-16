interface CancelButtonProps {
  label: string
  onClick: () => void
}

export default function CancelButton({ label, onClick }: CancelButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 inline-flex min-w-32 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0"
    >
      {label}
    </button>
  )
}
