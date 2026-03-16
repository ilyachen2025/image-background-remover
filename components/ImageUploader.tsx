'use client'

import { useState, useCallback } from 'react'
import UploadArea from './UploadArea'
import PreviewSection from './PreviewSection'
import LoadingSpinner from './LoadingSpinner'

export default function ImageUploader() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleFileSelect = useCallback(async (file: File) => {
    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('只支持 JPG、PNG、WebP 格式的图片')
      return
    }

    // 验证文件大小
    if (file.size > 5 * 1024 * 1024) {
      setError('图片大小不能超过 5MB')
      return
    }

    // 显示原图预览
    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // 开始处理
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '处理失败')
      }

      // 获取处理后的图片
      const blob = await response.blob()
      const resultUrl = URL.createObjectURL(blob)
      setResultImage(resultUrl)
      setSuccess('背景移除成功！')
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleReset = useCallback(() => {
    setOriginalImage(null)
    setResultImage(null)
    setError(null)
    setSuccess(null)
  }, [])

  const handleDownload = useCallback(() => {
    if (!resultImage) return

    const a = document.createElement('a')
    a.href = resultImage
    a.download = 'no-bg.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [resultImage])

  return (
    <div className="w-full">
      {!originalImage && !isLoading && (
        <UploadArea onFileSelect={handleFileSelect} />
      )}

      {isLoading && <LoadingSpinner />}

      {originalImage && !isLoading && (
        <PreviewSection
          originalImage={originalImage}
          resultImage={resultImage}
          onDownload={handleDownload}
          onReset={handleReset}
        />
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-xl">
          {success}
        </div>
      )}
    </div>
  )
}
