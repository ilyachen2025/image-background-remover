import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File

    if (!imageFile) {
      return NextResponse.json(
        { error: '请上传图片文件' },
        { status: 400 }
      )
    }

    // 检查文件大小 (最大 5MB)
    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: '图片大小不能超过 5MB' },
        { status: 400 }
      )
    }

    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: '只支持 JPG、PNG、WebP 格式' },
        { status: 400 }
      )
    }

    // 获取 Remove.bg API Key
    const apiKey = process.env.REMOVE_BG_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: '服务器配置错误，缺少 API Key' },
        { status: 500 }
      )
    }

    // 调用 Remove.bg API
    const removeBgFormData = new FormData()
    removeBgFormData.append('image_file', imageFile)
    removeBgFormData.append('size', 'auto')

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: removeBgFormData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Remove.bg API error:', errorData)
      return NextResponse.json(
        {
          error: '背景移除失败，请稍后重试',
          details: errorData.errors?.[0]?.title || 'Unknown error'
        },
        { status: 500 }
      )
    }

    // 获取处理后的图片
    const processedImage = await response.arrayBuffer()

    return new NextResponse(processedImage, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="no-bg.png"',
      },
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}
