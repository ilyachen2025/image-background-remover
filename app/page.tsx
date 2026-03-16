import ImageUploader from '@/components/ImageUploader'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
          🎨 AI 图片背景移除
        </h1>
        <p className="text-center text-gray-600 mb-8">
          上传图片，一键移除背景，获得透明 PNG
        </p>
        
        <ImageUploader />
        
        <div className="flex justify-center gap-8 mt-10 flex-wrap">
          <div className="text-center">
            <div className="text-3xl mb-1">⚡</div>
            <div className="text-sm text-gray-600">极速处理</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-1">🔒</div>
            <div className="text-sm text-gray-600">不存储图片</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-1">🎯</div>
            <div className="text-sm text-gray-600">高精度 AI</div>
          </div>
        </div>
      </div>
    </main>
  )
}
