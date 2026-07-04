---
name: web-deck
description: Use whenever 用户要做演示文稿 / presentation / slides / PPT、做演讲 / 汇报 / 分享幻灯片、想把内容或主题做成视觉化的网页幻灯片、或提到 deck / 幻灯片 / 演示 —— 即使用户没明说 "presentation" 或只给了主题还没给内容。覆盖中英文场景。
---

# Web Deck

用 HTML/CSS 做网页版幻灯片。**先逻辑后视觉**——先用逻辑化原则帮用户搭对内容骨架，再用内置的 34 套实体模板把骨架变得好看。

核心命题：**形式永远服务于功能**。视觉化是为了高效传达逻辑，不是为了好看而好看。

## Core Principles（NON-NEGOTIABLE）

1. **逻辑先于视觉** —— 进入模板前，必须先和用户对齐"意图 - 逻辑 - 边界 - 成功画面"四要素。逻辑骨架没搭对，再好看的视觉也是空中楼阁。
2. **实体模板优先** —— 克隆 `templates/<slug>/template.html` 改内容，**不从零生成 HTML**。模板即成品，质量最稳、最省 token、最忠于原作者设计。
3. **保留模板设计系统** —— 永不换字体、不改色板、不跨模板拼 slide、不删装饰元素。这些是模板的身份，改了就废了。
4. **形式服务功能** —— 每个视觉选择都要回答"它在帮传达什么逻辑？"。装饰不为装饰存在。
5. **固定 16:9 舞台** —— 1920×1080 设计画布，整体缩放到视口，**不按设备 reflow 内容**。手机上也是 16:9 letterbox。
6. **渐进式披露** —— 先读轻量索引 `templates/index.json` 选候选，只读选中那一个模板的 `design.md`。不 bulk-read。
7. **诉求合理 ≠ 在当前模板上改** —— 用户想要"更现代""更科技感"等诉求往往合理，但**正确解法是回 Phase 2 重选原生匹配的模板，不是在 Phase 3 破坏已选模板的设计系统**（换字体/改色 = 废掉模板身份）。详见下方"用户要改字体/配色怎么办"。

---

## 用户要改字体/配色怎么办（常见冲突的仲裁流程）

这是最高频的冲突：用户预览后说"字体太老气/背景太文艺，换成 Inter + 品牌蓝"。**不要直接照做，也不要硬刚。** 走这三步：

**第一步：识别诉求的合理内核。** 用户说"换 Inter"背后的真实诉求往往是"我要科技感/现代感"——这个诉求合理，问题在载体不在诉求。

**第二步：点出"在当前模板上改 = 双重失败"。**
- 失败一：换了字体/色，模板的留白、装饰、比例仍是原调性，做出来四不像；
- 失败二：废掉了一套本自洽的设计系统。
- 一句话告诉用户："这个模板的身份就是这套字体+配色，换了等于毁掉它。"

**第三步：把破坏性请求转译为建设性动作——回 Phase 2 重选模板。** 用 `index.json` 的 `mood`/`tone`/`scheme` 重新匹配原生承载目标调性的模板（如要科技感 → cobalt-grid / blue-professional / neo-grid-bold），让用户在浏览器里"show, don't tell"地对比。这样既满足诉求，又不废任何一套设计系统。

**用户坚持"我是客户我说了算"时**：最终决定权确实在用户，但你的职责是先把代价讲清（"这样改会让模板失去设计一致性，视觉质量会下降"），给过替代方案（重选模板）后，如果用户仍坚持，再执行——但建议保留原版方便回退。**不要消极抵抗（偷偷留原字体），也不要无提醒地照做。**

## 逻辑化与视觉化（指导纲领）

本 skill 的灵魂是两大原则。Phase 1 搭逻辑时遵循"逻辑化"，Phase 2-3 做视觉时遵循"视觉化"。

| 维度 | 核心问题 | 关键原则 |
|------|----------|----------|
| **🧠 逻辑化** | 内容骨架清晰吗？能被有说服力地传达吗？ | 明确沟通目标 · 故事结构（问题-原因-方案）· 金字塔原理（结论先行）· 六项原则（简单/意外/具体/可信/情感/故事）|
| **🎨 视觉化** | 逻辑能一目了然地"秀"出来吗？认知负荷低吗？ | 信噪比最大化 · 图效优势 · 数据可视化 · 留白 · 亲密性 · 对齐与对比 · 重复 · 简约 · 和谐统一 |

详细原则与"原则→slide 类型映射"见 [references/design-principles.md](references/design-principles.md)。Phase 1 搭逻辑、Phase 3 映射 slide 布局时读它。

---

## Phase 0: 模式检测

本 skill 只做**核心路径**：从零创建新演示文稿。

**明确不做**（用户要时直接说明超出范围，建议改用其他工具）：
- PPT/PPTX 文件转换 → 用专门的转换工具
- PDF 导出 / URL 部署 → deck 完成后用户自行处理
- 增强已有 HTML deck → 本 skill 聚焦新建

**检测用户输入类型**（影响 Phase 1 提问深度）：
- 用户给了完整草稿/笔记 → Phase 1.2 侧重提炼已有逻辑
- 用户只给主题 → Phase 1.2 侧重主动拟 outline
- 用户什么都没给 → Phase 1.1 先把意图问出来

---

## Phase 1: 意图-逻辑-边界-成功画面对齐（灵魂环节）

**这是本 skill 区别于普通"套模板"工具的核心**。四步必须走完，第 1.5 步向用户复述确认后才能进 Phase 2。

提问遵循"一次一层、用情境对比逼出答案"的原则——不抛一串问题淹没用户。如果当前环境有结构化提问 UI（AskUserQuestion），优先用它。

### 1.1 意图（Purpose）—— 排雷 XY 问题

用户常给"做个 X"，但 X 背后真正要解决的问题才是意图。

**话术**：
> "你说要做这个 deck。想象它做完了、观众看完了——你希望他们**带着什么离开 / 做出什么动作**？"

**XY 信号**（看到即追问）：用户说"做个关于 Y 的 PPT"→ 追问"Y 这个主题要解决听众的什么问题"。验收：用户能用一句话说出"做这个是为了 ___"。

### 1.2 逻辑（Logic）—— PPT 特有的核心维度

这一步产出一份 **slide outline**：每张讲什么、用什么视觉表达。

**先定逻辑结构**，二选一或结合（参考 references/design-principles.md）：
- **金字塔原理**：结论先行 → 分论点支撑 → 数据/事实佐证。适合汇报、论证、说服。
- **故事结构**：问题 → 原因 → 方案。适合提案、分享、教育。
- **六项原则**检查：简单（找到核心）/ 意外（打破预期）/ 具体（可感知）/ 可信（可验证）/ 情感（在乎）/ 故事（记得住）。

**再映射到 slide outline**。每张 slide 标注：
- 顺序号 + 一句话主旨
- 视觉表达类型：封面 / 目录 / 论点 / 数据图表 / 对比 / 引用 / 时间线 / 流程 / 矩阵 / 章节过渡 / 结尾
- 预估字数（用于后续匹配密度）

**根据用户输入分流**：
- 用户有草稿 → 提炼其逻辑结构，重组为 outline，主动指出逻辑断层
- 用户只有主题 → 主动拟 2-3 套不同结构的 outline 让用户选，**用情境对比**（如"A 金字塔式结论先行，适合说服；B 故事式问题导入，适合共鸣"）

**outline 确认**（结构化提问）：
> "这是 outline 草案（N 张）：
> 1. [封面] 标题 + 副标题
> 2. [问题] 当前痛点 + 数据
> ...
> 逻辑结构对吗？要调整结构、增删 slide、还是改某张的表达方式？"

### 1.3 边界（Constraints）

三个子维度，逐个确认（可并入一次结构化提问）：

**① 深度边界 —— 密度模式**（影响每张字数、留白、slide 数）：

| 密度模式 | 适合 | 设计行为 |
|----------|------|----------|
| **低密度 / 演讲主导** | 公开演讲、keynote、现场讲解 | 一张一观点，大字号，强视觉层次，大量留白，1-3 个要点，slide 可更多 |
| **高密度 / 阅读优先** | 报告、手册、异步评审、详细文档 | 更自包含，结构化网格/表格/注释，4-8 要点或 4-6 卡片，紧凑但仍留白 |

基线红线（两种模式都遵守）：不滚动、不溢出、面板不重叠、字号不小于舒适阅读尺寸。内容超密度就**拆成更多 slide，不要缩小塞进去**。

**② 范围边界**：
> "这个 deck 里，有哪些是你明确不想碰的？哪些必须包含？"（用户可答"没限制"，但必须答）

**③ 技术边界**：是否要配图、目标语言（中文/英文/中英混排，影响模板字体选择）、目标场合（正式/轻松，影响 formality 匹配）。

### 1.4 成功画面（Success Criteria）

**绝不用抽象提问**，全程情境对比：
> "做完后你打开它的那一刻——看到什么样的东西会觉得'这就够了'？
> - **甲**：今天就能拿到、够用就行（可能粗糙）
> - **乙**：精致完整、可正式分发（要多花时间打磨）
> 你更接近哪个？"

验收：用户说出**可观察的完成态**（"打开看到 N 张、逻辑清楚、能在浏览器全屏播放"），而非"好用""完善"这类形容词。

### 1.5 锚点复述确认

四要素汇总，向用户复述，确认后才进 Phase 2：
> "确认协作锚点：
> - **意图**：[一句话]
> - **逻辑**：[outline 结构 + N 张]
> - **边界**：[密度 / 范围 / 技术各一句]
> - **成功画面**：[可观察完成态]
> 对吗？对的话我开始选模板。"

---

## Phase 2: 模板发现（"show, don't tell"）

大多数人无法用语言表达设计偏好——**给他们看，别让他们说**。

### 2.1 读 `templates/index.json` 选 3 个候选

读 [templates/index.json](templates/index.json)（全库元数据索引，~42KB）。匹配 Phase 1 的意图：

- 用 `mood` / `tone` / `best_for` 匹配用户的场合与情绪
- 用 `formality` / `density` / `scheme` 做合理性校验（如高正式场合别选 low-formality 模板）
- `avoid_for` 当软警告，不当硬否决

**三个候选必须风格差异足够大**——别选三个 editorial。要一个最贴合的、一个温暖替代、一个重新诠释 brief 的 wildcard。用户要的是真正的选择。

> 💡 `index.json` 只投影了 12 个字段（不含 palette/typography）。matcher 阶段够用；深入某模板时读它的 `template.json`。

### 2.2 生成 3 个标题页预览

对每个候选：

1. 读该模板的 `template.html`，**只取第一张 slide**（封面/标题页）。
2. **填入用户的真实内容**：Phase 1 确认的标题、副标题、作者、日期——让预览真实，不是占位。
3. 保留模板完整设计系统（字体/色板/装饰/chrome）。
4. 保存为自包含 HTML 到 `.web-deck/previews/{a,b,c}.html`。

**骨架类型处理**（关键，两套骨架不兼容）：
- 判定法：读 `template.html`，grep 是否含 `deck-stage`。
- **骨架 A（deck-stage 版）**：保留 `<deck-stage>` 元素 + `<script src>` 引用 deck-stage.js。预览文件须能引用到 `templates/deck-stage.js`——把 deck-stage.js 内容内联进预览，或用相对路径引用。
- **骨架 B（内联 JS 版）**：保留该模板自己的内联导航 `<script>`。不要混入 deck-stage。

**预览真实性规则（NON-NEGOTIABLE）**：
- 每个预览必须像用户 deck 的真实第一张，不是诊断卡片。
- **禁止在 slide 上渲染**：内部工作流文字、模板名/slug、"preview"/"Option A"/"generated from" 标签、文件路径、用户需求笔记（如"严肃风格""适合内部"等元描述）。
- 需要的 chrome 只用真实 deck chrome：标题、副标题、日期、作者、页码。
- 开预览前检查可见文字，有内部元数据就改掉。

**自动打开每个预览**（用 `start <path>` on Windows / `open <path>` on macOS），让用户在浏览器里直观对比。

### 2.3 用户选 + 追问理由

**选择即探针**——用户选完追问"为什么选这个、不选那个？"记录考量因素（这暴露真实偏好，用于 Phase 3 的设计取舍）。

提供"Mix elements"选项：用户想混搭时问具体混什么（如"A 的配色 + B 的布局"）。

---

## Phase 3: 生成完整 deck

### 3.1 读选中模板的 `design.md`（只读这一个）

把它当"补缺失布局"的配方。重点读 frontmatter 的 `components` / `typography` / `spacing` + 正文 `Layout` / `Shapes` 节。**不要读其他模板的 design.md**。

### 3.2 克隆整个 `template.html` 到用户工作区

复制到用户指定的输出位置（或默认 `./deck/index.html` + 必要的 deck-stage.js）。

### 3.3 逐 slide 改内容

详细的保留/替换规则见 [references/clone-adapt-guide.md](references/clone-adapt-guide.md)。核心：

**永远保留**（这些就是设计系统）：
- 字体（Google Fonts link + `font-family`）
- 色板（`:root` CSS 变量）
- 布局 grid、绝对定位、flex 层级
- slide-level class（`.s-cover` / `.s-stats` / `.s-quote` 等）
- 装饰元素（角标、纸纹、SVG、几何形）
- 导航 runtime（deck-stage.js 或内联 script）

**永远替换**（这些是用户内容）：
- 标题 `<h1>`/`<h2>`/`<h3>`
- 正文 `<p>`、列表项、caption
- 数字与统计值（占位的 `47%`/`2.4M`）
- 署名、日期、引用出处
- section label / 页码 `NN / TT`

按 Phase 1 的 outline 把内容映射到合适的 slide layout。

### 3.4 增删 slide

- **多于 demo**：复制最接近 layout 的 `<section>` 整块，改内容，更新所有页码 `NN / TT`。
- **少于 demo**：从末尾删，更新页码。
- **缺某种 layout**（如下一节）。

### 3.5 补缺失布局（遵循"六同"）

当 outline 需要模板没有的 layout（如要对比表，模板只有 process-flow）：**默认按该模板 design.md 的设计系统从零补一张 `<section>`**。不引入新视觉语言，不跨模板拼。

**六同规则**（详见 references/clone-adapt-guide.md）：
1. 同字体（font-family / weight / letter-spacing / line-height）
2. 同色板（用现有 `:root` 变量，需要新色就取最近的 accent）
3. 同装饰词汇（角标/纸纹/几何形——模板有装饰你也要有，否则像断了）
4. 同间距节奏（`padding: 64px` 就 64px，8 列 grid 24px gutter 就照搬）
5. 同组件语法（stat 卡的结构：大数字→标签→描述→mono caption，复用而非另造）
6. 同 chrome（顶部 label / 底部页码 / 角标，对齐全 deck）

**自检**：把新 slide 夹在两张原有 slide 之间打开，看着属于 = 成成功；像嫁接的 = 重做。

**时间压力下的分叉**（不要教条）：

补布局有成本——读 design.md、对齐六同、自检返工，正常要 10-15 分钟。当同时满足：①用户明确给了硬截止时间（如"30 分钟内"），②缺的 layout 不是 1 张而是多张，③已选模板缺的 layout 正好是另一个模板的原生强项——这时**换一个原生支持该 layout 的模板，比硬补更对**。

判断标准：**补 1 张缺失布局 → 补；缺 2 张以上或要造整套新组件 → 换模板**。换模板的代价是放弃已选预览，但获得原生一致性。沉没成本（已选的预览）不是理由——前期投入很小。

注意：换模板 ≠ 混模板。换是"整套替换"，不是"A 模板的 slide + B 模板的 slide 拼一起"。

### 3.6 验证（NON-NEGOTIABLE）

生成完，**必须验证**：
1. 浏览器打开，截图检查 **1280×720 + 一个手机视口**。
2. 检查：内容不溢出卡片、面板不重叠、字体加载成功、导航（键盘/点击）正常。
3. `scrollHeight` 检查不够——grid 面板可能视觉上互相覆盖，要肉眼看截图。

**内联编辑**（默认含，不在 Phase 1 问）：hover 左上角或按 `E` 进编辑模式，点任意文字可改，`Ctrl+S` 保存。借鉴自 frontend-slides，是 draft 后的自然增强。

---

## Phase 4: 交付

1. **打开 + 给路径**：浏览器打开最终 deck，消息里给绝对路径（独立一行，可点击）。
2. **一句话说明**：选了哪个模板 + 为什么（tone 匹配一句话）+ 任何 caveat（如"我按 design.md 补了第 4、7 张对比表"）。
3. **告诉用户自定义方法**：
   - `:root` CSS 变量改配色
   - 字体 `<link>` 改 typography
   - 内联编辑模式直接改文字
4. **不叙述每一步**。用户要的是产物 + 路径 + 一句话理由，不是流程流水账。

---

## 反 AI 模式与 CSS 陷阱

全程避免"AI slop"美学，遵守 CSS 安全规则。详见 [references/pitfalls.md](references/pitfalls.md)。核心：
- 不用 Inter / Roboto / Arial 等通用字体（模板的字体就是设计系统）
- 不写白底紫渐变、cookie-cutter 卡片网格
- CSS 函数前导 `-`（如 `-clamp()`）会被静默丢弃，用 `calc(-1 * clamp(...))`
- slide 切换用 `.active` + `visibility`/`opacity`，不用 `display: none/block`

---

## Supporting Files

| File | Purpose | When to read |
|------|---------|--------------|
| [templates/index.json](templates/index.json) | 全库 34 模板的元数据索引（mood/tone/best_for/formality/density/scheme）| Phase 2.1 选候选时 |
| `templates/<slug>/template.html` | 实体模板（克隆+改内容）| Phase 2.2 预览 + Phase 3.2 克隆 |
| `templates/<slug>/template.json` | 单模板完整元数据（含 palette/typography/navigation）| Phase 3 深入某模板时 |
| `templates/<slug>/design.md` | 设计系统文档（components/typography/spacing + Layout/Shapes）| Phase 3.1 补缺失布局时 |
| [templates/deck-stage.js](templates/deck-stage.js) | 共享导航 web component（骨架A 模板引用）| 骨架A 模板预览/生成时 |
| [references/design-principles.md](references/design-principles.md) | 逻辑化 + 视觉化原则，原则→slide 类型映射 | Phase 1.2 搭逻辑 + Phase 3.5 映射布局 |
| [references/clone-adapt-guide.md](references/clone-adapt-guide.md) | 克隆+改内容+补布局的操作细则（六同规则）| Phase 3 生成全程 |
| [references/pitfalls.md](references/pitfalls.md) | 反 AI 模式清单 + CSS 陷阱 | Phase 3 全程 |
