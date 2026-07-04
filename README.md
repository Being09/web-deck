# Web Deck

一个 [ZCode](https://zcode.com) skill，用 HTML/CSS 制作网页版幻灯片。

**先逻辑后视觉**：以"逻辑化 + 视觉化"为指导原则，先帮你把演示文稿的逻辑骨架搭对（金字塔原理 / 故事结构），再用内置的 34 套漂亮 HTML 模板把骨架变得好看。**形式永远服务于功能。**

## 特性

- 🧠 **逻辑化优先** —— 进入模板前，先对齐"意图 - 逻辑 - 边界 - 成功画面"。逻辑骨架没搭对，再好看的视觉也是空中楼阁。
- 🎨 **34 套实体模板** —— 内置全部模板（vendor 进包），克隆即用、离线可用。覆盖 editorial / brutalism / retro / 极简 / 暖调 / 暗色等全谱系风格。
- 🔧 **实体模板优先** —— 克隆现成模板改内容，不从零生成。质量稳定、忠于原作者设计。
- 🖥️ **固定 16:9 舞台** —— 1920×1080 设计画布，整体缩放到视口，不按设备重排内容。
- ✏️ **内联编辑** —— 生成的 deck 默认支持浏览器内直接改文字（hover 左上角或按 `E`）。

## 安装

把本目录放到 ZCode skill 发现路径之一：

```bash
# 项目级（仅当前项目可用，优先级最高）
cp -r web-deck <project>/.zcode/skills/

# 或用户级（所有项目可用）
cp -r web-deck ~/.zcode/skills/

# 或跨工具标准位置
cp -r web-deck ~/.agents/skills/
```

无需额外依赖——34 个模板和导航运行时（`deck-stage.js`）已全部内置在 `templates/` 目录。

## 使用

在你的 ZCode 会话里直接说要做什么演示文稿，skill 会自动触发：

> "帮我做一个关于 [主题] 的演示文稿"
> "我要做一个产品发布的 slides"
> "把这个大纲做成 HTML 幻灯片"

skill 会按四步走：
1. **对齐** —— 问清意图、搭逻辑骨架（outline）、定边界和成功画面
2. **发现** —— 读模板索引选 3 个候选，生成标题页预览让你在浏览器里对比
3. **生成** —— 克隆你选的模板，按 outline 替换内容，缺布局按设计系统补
4. **交付** —— 浏览器打开最终 deck，给路径 + 一句话说明

## 模板画廊

内置 34 套模板，按风格谱系大致分组：

| 风格 | 模板 |
|------|------|
| **Editorial / 杂志感** | Soft Editorial、Editorial Forest、Editorial Tri-Tone、Emerald Editorial、Biennale Yellow、Vellum、Cartesian、Signal |
| **Neo-brutalism / 新粗野** | Neo-Grid Bold、Raw Grid、BlockFrame、Bold Poster |
| **Retro / 复古** | 8-Bit Orbit、Retro Windows、Retro Zine、Sakura Chroma、Stencil & Tablet |
| **暖调 / 手作** | Pin & Paper、Daisy Days、Scatterbrain、Playful、Coral、Mat、Grove |
| **暗色 / 高对比** | Studio、Pink Script、Broadside |
| **专业 / 商务** | Blue Professional、Cobalt Grid、Long Table |
| **图形 / 海报** | Creative Mode、Capsule、People's Platform、Monochrome |

每个模板的 `templates/<slug>/` 下有：
- `template.html` —— 实体模板（克隆 + 改内容用）
- `template.json` —— 完整元数据（配色、字体、导航方式）
- `design.md` —— 设计系统文档（补缺失布局用）
- 部分（骨架 A 的 10 个）额外含 `deck-stage.js`

全库索引见 `templates/index.json`（含 mood/tone/best_for/formality/density/scheme 等匹配字段）。

## 依赖来源与致谢

本 skill 站在两个出色项目的肩膀上：

- **模板资源**：[zarazangrui/beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates)（MIT）—— 34 套 HTML 模板的原始来源，已 vendor 进 `templates/` 目录。
- **工作流借鉴**：[zarazangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) —— Phase 划分、视觉预览发现、密度模式、渐进式披露等流程设计参考。

本 skill 在两者基础上的核心增量：**把"逻辑化原则"前置于模板选择**，形成"意图-逻辑-边界-成功画面"四步对齐环节，确保形式服务功能。

## 目录结构

```
web-deck/
├── SKILL.md                  # skill 主指令（给 agent）
├── README.md                 # 本文件（给人）
├── LICENSE                   # MIT
├── .gitignore
├── templates/                # 34 套模板 + 索引 + 共享运行时
│   ├── index.json
│   ├── deck-stage.js
│   └── <slug>/               # template.html + template.json + design.md
└── references/               # 按需深读的领域文档
    ├── design-principles.md  # 逻辑化 + 视觉化原则
    ├── clone-adapt-guide.md  # 克隆 + 改内容 + 补布局细则
    └── pitfalls.md           # 反 AI 模式 + CSS 陷阱
```

## License

MIT —— 见 [LICENSE](LICENSE)。模板部分遵循原仓库 [beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates) 的 MIT 许可。
