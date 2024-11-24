export default function Messaging({
  successMessage,
  errorMessage
}: {
  successMessage: string | null
  errorMessage: string | null
}) {
  return (
    <>
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
    </>
  )
}
