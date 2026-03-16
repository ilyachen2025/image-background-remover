'use client'

import { useCallback, useState } from 'react'

interface UploadAreaProps {
  onFileSelect: (file: File) => void
}

export default function UploadArea({ onFileSelect }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }, [onFileSelect])

  const handleClick = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/jpeg,image/png,image/webp'
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        onFileSelect(files[0])
      }
    }
    input.click()
  }, [onFileSelect])

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-3 border-dashed rounded-2xl p-12 md:p-16 text-center cursor-pointer
        transition-all duration-300 ease-in-out
        ${isDragOver 
          ? 'bg-indigo-50 border-purple-600 scale-[1.02]' 
          : 'bg-indigo-50/50 border-indigo-400 hover:bg-indigo-50 hover:border-purple-600'}
      `}
    >
      <div className="text-6xl mb-4">📤</div>
      <div className="text-xl font-medium text-gray-800 mb-2">
        点击或拖拽图片到此处
      </div>
      <div className="text-sm text-gray-500">
        支持 JPG、PNG、WebP 格式，最大 5MB
      </div>
    </div>
  )
}
