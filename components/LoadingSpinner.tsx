export default function LoadingSpinner() {
  return (
    <div className="text-center py-12">
      <div className="w-14 h-14 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-6"></div>
      <p className="text-gray-600">AI 正在处理中，请稍候...</p>
    </div>
  )
}
