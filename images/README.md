# 图片资源管理指南

## 📁 文件夹结构

```
images/
├── icons/              # 应用图标 (512x512px)
│   ├── app1-icon.svg   # 场记板 Pro 图标
│   ├── app2-icon.svg   # 简单时间 图标
│   └── app3-icon.svg   # 计分板 图标
├── screenshots/        # 应用截图 (375x812px)
│   ├── app1/          # 场记板 Pro 截图
│   │   ├── screenshot1.svg
│   │   └── screenshot2.svg
│   ├── app2/          # 简单时间 截图
│   │   └── screenshot1.svg
│   └── app3/          # 计分板 截图
│       └── screenshot1.svg
├── hero/              # 首页宣传图
│   ├── hero-banner.svg     # 主横幅 (800x600px)
│   └── phone-preview.svg   # 手机预览 (300x600px)
├── banners/           # 其他横幅图片
└── features/          # 功能特性图片
```

## 🎯 图片命名规范

### 应用图标
- 格式：`app{数字}-icon.{扩展名}`
- 尺寸：512x512px
- 格式：SVG/PNG
- 示例：`app1-icon.svg`, `app2-icon.png`

### 应用截图
- 格式：`screenshot{数字}.{扩展名}`
- 尺寸：375x812px (iPhone 竖屏)
- 格式：SVG/PNG/JPG
- 示例：`screenshot1.svg`, `screenshot2.png`

### 宣传图片
- 英雄横幅：`hero-banner.{扩展名}` (800x600px)
- 手机预览：`phone-preview.{扩展名}` (300x600px)

## 🔄 如何替换图片

1. **保持文件名不变**：直接替换现有文件，无需修改代码
2. **保持尺寸比例**：确保新图片与建议尺寸一致
3. **支持格式**：SVG, PNG, JPG, WebP
4. **优化建议**：
   - 图标使用SVG格式（矢量，无损缩放）
   - 截图使用PNG格式（保持清晰度）
   - 宣传图可使用JPG格式（文件更小）

## 📱 当前应用对应关系

- **app1** = 场记板 Pro (影视拍摄工具)
- **app2** = 简单时间 (全屏时钟)
- **app3** = 计分板 (比赛记分工具)

## 💡 使用提示

- 所有占位图片都是SVG格式，包含应用名称标识
- 可以直接用真实图片替换，保持文件名即可
- 如需添加新应用，按照命名规范创建对应文件夹和文件
- 建议使用压缩工具优化图片大小，提升加载速度