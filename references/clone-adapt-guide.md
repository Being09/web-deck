# 克隆 + 改内容 + 补布局操作指南

本指南是 Phase 3（生成完整 deck）的操作细则。本地化自 beautiful-html-templates 的 `AGENTS.md` §3-5-6，针对本 skill 的 34 个 vendored 模板。

核心思路：**模板是成品，你做的是"克隆 → 替换内容 → 按需补布局"，不是从零生成。**

---

## 0. 先判断模板属于哪套骨架（关键，两套不兼容）

本 skill 的 34 个模板有**两套完全不同的 HTML 骨架**，克隆前必须判断，**不能混用**：

### 骨架 A：`<deck-stage>` 版（10 个模板）

模板：creative-mode、editorial-forest、editorial-tri-tone、emerald-editorial、neo-grid-bold、peoples-platform、pin-and-paper、pink-script、soft-editorial、stencil-tablet

**特征**：
```html
<head>
  <script src="deck-stage.js"></script>   <!-- 引用 web component -->
</head>
<body>
  <deck-stage width="1920" height="1080">
    <section class="slide s-cover" data-label="01 Cover"> ... </section>
    <section class="slide s-stats" data-label="02 Stats"> ... </section>
    ...
  </deck-stage>
</body>
```

- 幻灯片 = `<deck-stage>` 的直接子 `<section>`
- slide layout 用 `s-<布局名>` class（`.s-cover` / `.s-stats` / `.s-quote` ...）
- 导航/缩放由 `deck-stage.js` web component 处理（键盘、触摸、控制条、打印）

**处理要点**：克隆时**必须带上 `deck-stage.js`**（模板文件夹自带一份，或用 `templates/deck-stage.js`）。预览/生成时确保 `<script src>` 路径正确，或把 deck-stage.js 内容内联进 HTML。

### 骨架 B：内联 JS 版（24 个模板）

模板：8-bit-orbit、biennale-yellow、block-frame、blue-professional、bold-poster、broadside、capsule、cartesian、cobalt-grid、coral、daisy-days、grove、long-table、mat、monochrome、playful、raw-grid、retro-windows、retro-zine、sakura-chroma、scatterbrain、signal、studio、vellum

**特征**：**不用 `<deck-stage>`**，外层是普通 `<div>`，各自带一段内联 `<script>` 做导航。

```html
<body>
  <div class="deck">
    <div class="stage">
      <section class="slide s-cover hairlines active"> ... </section>
      <section class="slide s-manifesto hairlines"> ... </section>
      ...
    </div>
  </div>
  <script>
    // 各模板自己写的 10-30 行 keydown + 切 .active 类
    const slides = Array.from(document.querySelectorAll('.slide'));
    ...
  </script>
</body>
```

**内部也不统一**（务必注意）：
- 多数用 opacity 切换（`.slide.active { opacity: 1 }`）
- 少数用 translateY 垂直滚动（如 8-bit-orbit）
- slide 类名/属性约定各异（有的用 `data-slide="1"`，有的用 `data-label`）
- 切换类名各异（`.active` 最常见，也有别的）

**处理要点**：保留该模板**自己的内联导航 script 原样不动**。不要试图把 deck-stage.js 套上去，也不要把骨架 B 不同模板的脚本混用。

### 判定法

读 `template.html`，grep 字符串 `deck-stage`：
- 命中 → 骨架 A
- 不命中 → 骨架 B

---

## 1. 永远保留（这些就是设计系统）

改内容时，以下东西**碰都不要碰**：

- **字体**。Google Fonts `<link>` 和 `font-family` 声明。"Inter 差不多"——不，字体就是设计系统。Cormorant 加载不了就修 import，不换族。
- **色板**。`:root` 里所有 CSS 变量和颜色值。一个小 accent 偏移都会破坏调和。
- **布局 grid**。grid 列数、绝对定位、flex 层级。不重组结构。
- **slide-level CSS class**。`.s-toc` / `.slide--quote` / `.layout-cover` 这些承载视觉身份。
- **装饰元素**。角标、纸纹、几何形、SVG 插画、手绘涂鸦——它们是身份的一部分，不是可选装饰。
- **导航 runtime**。deck-stage.js（骨架 A）或内联 script（骨架 B）。模板用什么就继续用什么。

## 2. 永远替换（这些是用户内容）

- **标题**。`<h1>`/`<h2>`/`<h3>` 等。
- **正文**。`<p>`、列表项、caption。
- **数字与统计**。占位的 `47%`/`2.4M`/`+142%` 这类示例值。
- **署名、日期、出处**。作者名、引用行、"May 2026" 占位。
- **section label 和 chrome 文字**。模板里的 `[Topic]`/`[Year]`/`[Studio]` 这类占位 token。
- **页码**。`NN / TT` 形式，增删 slide 后必须更新。

> 注意：本 skill 的模板**几乎不用图片占位符**（全库仅 broadside、grove 用了 `<img>`）。多数模板靠文字 + CSS/SVG 装饰。如果模板有 `<img>`，替换成用户图片时**保持原尺寸**。

## 3. 增删 slide

### 添加（用户内容多于 demo）

复制**最接近 layout** 的 `<section>` 整块，替换其内容。例如要加一张数据卡，复制已有的 `.s-stats` section 改数字。

**必须更新所有页码**（`NN / TT` 的 TT 是总数）。

### 删除（用户内容少于 demo）

从**末尾**删 slide，保留封面和结构完整的部分。更新页码。

---

## 4. 补缺失布局：六同规则

当 outline 需要模板没有的 layout（如要对比表，模板只有 process-flow 和 stat-grid）：

**不要 bail、不要换模板、不要引入新视觉语言**。按该模板 `design.md` 的设计系统从零补一张 `<section>`。

### 补之前先读

读选中模板的 `design.md`，重点：
- frontmatter 的 `components:` —— 每个可复用组件的尺寸/圆角/padding/引用哪些色（相当于组件 API）
- frontmatter 的 `typography:` —— 每个文字角色（hero 数字 vs card 标题 vs eyebrow）的确切字号/行高/字距
- frontmatter 的 `spacing:` + `canvas:` —— 间距节奏（如 `pad-outer: 80px`、`gap-cards: 28px`）
- 正文 `## Layout` —— 画布系统、padding/gap scale、chrome frame 位置约定
- 正文 `## Shapes and Treatment` —— 圆角范围、描边粗细、装饰元素类型

### 六同（必须全部满足）

1. **同字体**。用模板 h1/h2/body/mono 各自的 `font-family`。同 weight、同 letter-spacing、同 line-height。
2. **同色板**。用现有 `:root` CSS 变量。新 layout 需要"警告/高亮"色但调色板没有时，取最近的 accent，**绝不引入新 hex**。
3. **同装饰词汇**。模板用角标，你的新 slide 也要有角标；模板用纸纹，你也要有。一个满是装饰的模板里突然出现一张光秃秃的 slide = 像坏了。
4. **同间距节奏**。模板 slide 用 `padding: 64px`，你也用；8 列 grid 24px gutter，你也照搬。
5. **同组件语法**。模板的 stat 卡是"大数字→标签→描述→mono caption"结构，新 stat-like 元素就复用这个结构，不另造。
6. **同 chrome**。顶部 label / 底部页码 / 角标，对齐全 deck 的约定。

### 自检

把新 slide 夹在两张原有 slide 之间打开。看着**属于** = 成功；像不同模板嫁接的 = 重做。

---

## 5. 反模式（硬红线）

- ❌ **换字体**。"Inter 跟原来的差不多"——不，typography 就是设计系统。
- ❌ **改色**。再小的 accent 偏移都会破坏色板调和。
- ❌ **跨模板拼 slide**。每个模板是封闭的视觉系统。把 raw-grid 的 slide 和 neo-grid-bold 的 slide 拼一起 = 业余。（注意：**在同一个模板内扩展**是允许的，见第 4 节；**跨模板拼接**不允许。）
- ❌ **删"多余"装饰**。角标、纸纹、SVG 装饰是身份，不是噪音。
- ❌ **"现代化"老模板**。模板按设计工作。觉得过时就换一个，别改现有的。
- ❌ **混用骨架**。骨架 A 模板套 deck-stage.js，骨架 B 模板用自己的内联 script——绝不交叉。

---

## 6. 内容映射到 slide layout 的实操

Phase 1.2 的 outline 每张都标注了视觉表达类型（封面/论点/数据/对比/引用/...）。生成时：

1. **优先用模板已有的 layout**。读 `template.html`，列出它有哪些 `.s-*` layout。
2. outline 的每张 → 找模板里最接近的 layout → 复制该 section → 改内容。
3. outline 需要的 layout 模板没有 → 走第 4 节"六同"补一张。
4. 模板有的 layout 但 outline 不需要 → 删掉对应 section。

**密度对齐**：Phase 1.3 选的密度模式要贯彻全 deck。
- 低密度：每张只填核心内容，留白大方，该拆就拆成多张。
- 高密度：可以填满，但仍遵守"不溢出、不重叠、字号不小于舒适阅读尺寸"。
