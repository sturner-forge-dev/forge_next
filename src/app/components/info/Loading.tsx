export default function Spinner() {
  return (
    <div className="w-full h-[calc(100vh-200px)] flex justify-center items-center">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 animate-spin rounded-full border-b-2 border-white" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span>Loading...</span>
        </div>
      </div>
    </div>
  )
}
