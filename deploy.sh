#!/bin/bash

# Cloudflare Pages 部署脚本
# 需要先配置好 CLOUDFLARE_API_TOKEN 和 CLOUDFLARE_ACCOUNT_ID

set -e

echo "🚀 开始部署到 Cloudflare Pages..."

# 检查环境变量
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ 错误: CLOUDFLARE_API_TOKEN 未设置"
    exit 1
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "❌ 错误: CLOUDFLARE_ACCOUNT_ID 未设置"
    exit 1
fi

# 构建项目
echo "📦 构建项目..."
npm run build

# 部署到 Cloudflare Pages
# 注意: 首次部署需要通过 Dashboard 创建项目并连接 GitHub
echo "☁️ 部署到 Cloudflare Pages..."
echo ""
echo "请确保已在 Cloudflare Dashboard 中:"
echo "1. 创建 Pages 项目"
echo "2. 连接 GitHub 仓库: ilyachen2025/image-background-remover"
echo "3. 设置构建命令: npm run build"
echo "4. 设置输出目录: out"
echo "5. 添加环境变量: REMOVE_BG_API_KEY"
echo ""

# 尝试使用 wrangler 部署（如果项目已存在）
if command -v npx &> /dev/null; then
    echo "尝试使用 wrangler 部署..."
    npx wrangler pages deploy out --project-name=image-background-remover || true
fi

echo "✅ 部署脚本执行完成"
echo ""
echo "如果自动部署失败，请手动在 Cloudflare Dashboard 中部署:"
echo "https://dash.cloudflare.com/$CLOUDFLARE_ACCOUNT_ID/pages"
