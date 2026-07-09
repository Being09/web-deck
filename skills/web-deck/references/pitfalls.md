# 反 AI 模式清单 + CSS 陷阱

生成 deck 时全程遵守。这些是"AI slop"的典型特征和会让浏览器静默失败的 CSS 陷阱。

---

## 一、反 AI 模式清单（避免"AI slop"美学）

模型在 frontend 设计上倾向收敛到"on distribution"的通用输出，用户称之为"AI slop"。要主动避开。

### 字体

- ❌ Inter、Roboto、Arial、system-ui 等通用无衬线
- ❌ Space Grotesk（模型跨次生成高频收敛的选择）
- ✅ 用模板自带的字体（模板字体就是设计系统，永不替换）
- ✅ 补缺失布局时，严格用模板 `font-family`，不擅自换族

### 配色

- ❌ 白底紫色渐变（`#6366f1` 靛蓝渐变是 AI 输出最高频 cliché）
- ❌ 通用的"科技蓝渐变"/dashboard 配色
- ✅ 用模板 `:root` CSS 变量定义的色板
- ✅ 主色 + 尖锐 accent 优于胆怯的均匀分布色板

### 布局与组件

- ❌ Cookie-cutter 卡片网格（3-4 张一模一样的圆角卡）
- ❌ 到处毛玻璃（`backdrop-filter: blur`）却没有功能理由
- ❌ 现实风格插图（尤其中间偏 AI 生成的"3D 小人"）
- ❌ 为了"科技感"硬加的粒子/网格背景
- ✅ 模板有什么布局就用什么，缺了按"六同"补
- ✅ 留白比塞满更有力量

### 内容

- ❌ 占位文字留在 slide 上（如"Lorem ipsum"、`[Topic]`、`[Year]`）
- ❌ 内部工作流元数据（"preview"、"Option A"、"generated from"、模板名/slug、文件路径）
- ❌ 把用户的需求笔记当 slide 内容（如"严肃风格""内部使用"——除非用户明确要这句上 slide）
- ✅ 每个可见文字都是用户要传达的真实内容
- ✅ chrome 只用真实 deck chrome：标题、日期、作者、页码

### 动画

动画是引导注意力的工具，不是装饰——遵守与"强调≤2 处"同源的信噪比原则。详见 [motion-guide.md](motion-guide.md)。

- ❌ 每个元素都加 `[data-anim]`（强调泛滥 = 没强调，单张 ≤7 个）
- ❌ 循环动画（`animation-iteration-count: infinite`）当常态——入场动画只播一次，循环闪烁/脉动是注意力杀手
- ❌ 动画时长 >800ms（拖慢节奏）或 <200ms（突兀廉价）
- ❌ 给纯装饰 chrome（页码、角标、垂直 mono 标签）加动画——它们本不该抢戏
- ❌ 正文段落整块 `fade-up`——动画干扰阅读
- ❌ 给自带动画的 5 个模板（broadside/monochrome/grove/signal/studio）重复引 motion.css——它们已有同名 keyframe，重复定义会冲突；这 5 个开箱即用
- ✅ 入场一次、引导视线顺序（错峰 `data-delay`）
- ✅ 强度对齐 Phase 1.3④（"轻"只用 fade-up/fade-in）
- ✅ 动画是增强不是依赖——静态下内容必须完整可见

---

## 二、CSS 陷阱（会让浏览器静默失败）

### 1. CSS 函数前导 `-` 被静默丢弃

**反例**（浏览器直接忽略，不报错）：
```css
margin-top: -clamp(20px, 5vh, 60px);       /* ❌ 静默失效 */
left: -min(100px, 10vw);                    /* ❌ 静默失效 */
transform: -max(scale, 0.5);                /* ❌ 静默失效 */
```

**正例**：
```css
margin-top: calc(-1 * clamp(20px, 5vh, 60px));   /* ✅ */
left: calc(-1 * min(100px, 10vw));                /* ✅ */
```

**规则**：任何负值的 CSS 函数，用 `calc(-1 * ...)` 包裹。

### 2. slide 切换不要用 `display: none/block`

**为什么**：后期的 layout class 如 `.slide-content { display: flex }` 会覆盖 `display: none`，导致**所有 slide 同时可见**。

**正例**（用 visibility + opacity + pointer-events）：
```css
.slide {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  /* 始终保留在布局里，不 display:none */
}
.slide.active,
.slide.visible {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}
```

骨架 A 的 deck-stage 用 `[data-deck-active]` 属性切换；骨架 B 的内联版多数用 `.active` class。**沿用模板原有的切换机制，不要改**。

### 3. 字体加载失败的处理

- Google Fonts `<link>` 必须保留在 `<head>`。
- 字体加载前的 FOUT（无样式文本闪烁）是正常的，不要因此换字体族。
- 如果某字体确实加载不了，**修 import**（检查 link URL、是否被墙），**不换 family**。"Cormorant 跟 Source Serif 差不多"——不，这是设计系统。

### 4. 16:9 固定舞台的缩放

模板的舞台是固定 1920×1080，整体 `transform: scale()` 缩放到视口：
- 缩放**整个舞台**，不按设备 reflow slide 内容。
- 手机上保持 16:9，letterbox（上下黑边）或 pillarbox（左右黑边）都可，但**不重排内容**。
- 骨架 A 由 deck-stage.js 自动处理缩放；骨架 B 各模板的内联 script 处理。沿用即可。

### 5. `prefers-reduced-motion`

尊重用户的减少动画偏好：
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
模板通常已内置；补缺失布局时如果加了新动画，记得加这条。引入 [motion.css](../templates/motion.css) 的 deck 已含针对 `[data-anim]` 的全局 reduced-motion 兜底（动画置 none、元素置可见），无需重复加；但模板自带的过渡动画（slide 切换 opacity 等）仍需各自有这条。

---

## 三、预览真实性红线（Phase 2.2 专设）

生成 3 个标题页预览时，**每个预览必须像用户 deck 的真实第一张**，不是诊断卡片。

**绝对禁止在预览 slide 上出现**：
- `preview` / `Option A/B/C` / `generated from` / `template` / `preset` / `style option` 等工作流词
- 模板名或 slug（如 "Soft Editorial"、"neo-grid-bold"）——这些只属于给用户的消息，不属于 slide
- 文件名、路径
- 用户需求笔记的元描述（"严肃风格""适合内部分享""受众：高管"）——除非用户明确要这句上 slide
- 任何看起来像"设计过程标注"的东西

**应该出现的 chrome**：真实的 deck 标题、副标题、日期、作者、公司、页码，或用户素材里的真实内容短语。

**开预览前检查**：扫一遍可见文字，发现内部元数据就改掉，再打开。
