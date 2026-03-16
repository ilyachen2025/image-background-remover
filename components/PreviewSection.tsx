'use client'

interface PreviewSectionProps {
  originalImage: string
  resultImage: string | null
  onDownload: () => void
  onReset: () => void
}

export default function PreviewSection({
  originalImage,
  resultImage,
  onDownload,
  onReset,
}: PreviewSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 原图 */}
        <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-100">
          <div className="bg-indigo-500 text-white py-2 text-center text-sm font-medium">
            📷 原图
          </div>
          <div className="relative h-64 md:h-80 bg-gray-200">
            <img
              src={originalImage}
              alt="原图"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 去背景后 */}
        <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-100">
          <div className="bg-indigo-500 text-white py-2 text-center text-sm font-medium">
            ✨ 去背景后
          </div>
          <div 
            className="relative h-64 md:h-80"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #ccc 25%, transparent 25%),
                linear-gradient(-45deg, #ccc 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #ccc 75%),
                linear-gradient(-45deg, transparent 75%, #ccc 75%)
              `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            }}
          >
            {resultImage ? (
              <img
                src={resultImage}
                alt="去背景后"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                处理中...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 按钮组 */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={onDownload}
          disabled={!resultImage}
          className={`
            px-8 py-4 rounded-full font-medium text-lg
            flex items-center gap-2
            transition-all duration-200
            ${resultImage
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          ⬇️ 下载透明 PNG
        </button>

        <button
          onClick={onReset}
          className="px-8 py-4 rounded-full font-medium text-lg bg-gray-100 text-gray-700
                     hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
        >
          🔄 处理新图片
        </button>
      </div>
    </div>
  )
}
