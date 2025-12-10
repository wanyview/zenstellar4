<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ZenStellar - 星禅智者

一个融合古老占星术与禅宗哲学的灵性指引应用，帮助用户通过星辰的排列与正念冥想来引导日常生活。

## ✨ 功能特性

- 🌌 **今日运势** - 基于星座的每日运势指引
- 🎋 **禅境** - 禅意诗句与冥想引导
- 💡 **灵感** - AI 生成的创意图像
- 💬 **星语** - 与星禅智者的深度对话

## 🚀 本地运行

**前置要求:** Node.js >= 18.0.0

1. 克隆项目
```bash
git clone <your-repo-url>
cd zenstellar
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
# 复制环境变量示例文件
cp .env.example .env.local

# 编辑 .env.local，添加你的 Gemini API Key
# 获取 API Key: https://ai.google.dev/
VITE_API_KEY=your_gemini_api_key_here
```

4. 启动开发服务器
```bash
npm run dev
```

5. 在浏览器中打开 `http://localhost:5173`

## 📦 部署到 Vercel

### 方式一：通过 Vercel CLI

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 登录并部署
```bash
vercel
```

3. 在 Vercel Dashboard 中配置环境变量
   - 进入项目设置 → Environment Variables
   - 添加 `VITE_API_KEY` = 你的 Gemini API Key

### 方式二：通过 GitHub 集成

1. 将代码推送到 GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. 在 [Vercel](https://vercel.com) 中导入你的 GitHub 仓库

3. 配置环境变量
   - Build & Development Settings 会自动检测为 Vite 项目
   - 在 Environment Variables 中添加:
     - `VITE_API_KEY` = 你的 Gemini API Key

4. 点击 Deploy

## 🛠️ 技术栈

- **前端框架:** React 18 + TypeScript
- **构建工具:** Vite 5
- **样式:** Tailwind CSS
- **AI 能力:** Google Gemini API
- **部署:** Vercel

## 📝 环境变量说明

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `VITE_API_KEY` | Google Gemini API Key | 是 |

## 🔗 相关链接

- [获取 Gemini API Key](https://ai.google.dev/)
- [Vercel 部署文档](https://vercel.com/docs)
- [原始 AI Studio 应用](https://ai.studio/apps/drive/12eqEEZ6gUBAHd1iTW8eESBRhuyYwDryr)

## 📄 License

MIT License
