# AI 图片背景移除工具

基于 Next.js + Tailwind CSS + Remove.bg API 的图片背景移除服务。

## 特点

- ⚡ **极速处理** - 使用 Remove.bg 专业 AI API
- 🔒 **隐私安全** - 图片仅内存处理，不存储
- 🎯 **高精度** - 专业级背景移除效果
- 📱 **响应式设计** - 完美适配手机、平板、电脑
- 🆓 **免费使用** - 基于 Remove.bg 免费额度

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **AI 服务**: Remove.bg API

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
REMOVE_BG_API_KEY=your_remove_bg_api_key_here
```

获取 API Key: https://www.remove.bg/

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 使用限制

- 单张图片最大 5MB
- 支持格式：JPG、PNG、WebP
- 输出格式：PNG（透明背景）
- Remove.bg 免费额度：50 次/月

## 项目结构

```
app/
├── api/remove-bg/route.ts    # API 路由 - 调用 Remove.bg
├── layout.tsx                 # 根布局
├── page.tsx                   # 首页
└── globals.css                # 全局样式
components/
├── ImageUploader.tsx          # 主上传组件
├── UploadArea.tsx             # 上传区域
├── PreviewSection.tsx         # 预览区域
└── LoadingSpinner.tsx         # 加载动画
```

## 部署

### Vercel (推荐)

```bash
npm i -g vercel
vercel
```

### 其他平台

支持任何支持 Next.js 的平台：
- Netlify
- Railway
- Render
- 自有服务器

## 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `REMOVE_BG_API_KEY` | Remove.bg API Key | ✅ |

## 许可证

MIT
