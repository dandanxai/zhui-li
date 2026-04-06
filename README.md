⛩️ 筑理 · 中国古建筑数字化营造平台
“凡屋之高，以举径为法。尺寸之间，皆是天人之法。” —— 2026 数字化营造项目

筑理 (Zhu-Li) 是一套融合了中国传统建筑美学与现代数字技术的综合性展示平台。项目通过极致的交互动效与 AI 推演，将《营造法式》中的古老智慧转化为可视化、可交互、可感知的数字卷轴。

🌟 核心卷轴 (Core Features)
1. 🏮 天枢 · 舆图 (Dashboard)
基于数字化地理信息与三维逻辑的全屏可视化大屏。提供中国古建筑分布的宏观视角，开启“纯净/全屏”沉浸式交互模式，是整套系统的数字大脑。

2. 🤖 筑理 · 智脑 (AI Master)
内置通用智能中枢 (Universal Intelligence Hub)，支持对话推演与丹青作画。

对话推演：深度解析斗拱力学、徽派美学等建筑逻辑。

丹青作画：通过 AI 生成符合意境的古建图卷。

灵感捕捉：支持选中网页文字/图片点击右键直接向“大匠”提问。

3. 📜 典籍 · 法式 (Texts)
采用 GSAP ScrollTrigger 驱动的 400vh 史诗级滚动交互。

书卷联动：随着用户滚动，中间的 3D 书本模型会自动切换封面与内容。

视差叙事：卡片与背景大字通过不同速率的位移，营造极强的空间深度感。

4. 🏛️ 览筑 · 规制 (Explore)
涵盖宫殿、民居、桥梁等分类。支持全屏沉浸式看图模式，点击建筑图片可实现从中心向全屏炸裂扩展的背景过渡效果，导航栏始终悬浮于最上方。

5. 🧧 薪火 · 文脉 (Heritage)
采用左侧固定叙事 + 右侧时间轴滚动的设计。当你向下探索时，一根“金色脉络线”会随滚动自动向下生长，隐喻文明的生生不息。

🛠️ 技术栈 (Tech Stack)
前端框架：Vue 3 (Composition API)

动效引擎：GSAP (ScrollTrigger / Flip / Pin)

样式处理：Tailwind CSS (响应式、毛玻璃、混合模式)

路由管理：Vue Router (包含动态标题切换与“合龙”加载动画)

后端驱动：Node.js + Express (SSE 流式响应 / AI 接口集成)

字体图标：Remix Icon + 衬线体 (Serif) 国风字体排版

🚀 快速启动
前端启动
Bash
# 进入根目录
npm install
npm run dev
后端 AI 服务
Bash
# 进入 server 目录
cd server
npm install
# 请在 server 目录下创建 .env 文件并配置 API_KEY
npm start
🎨 视觉规范 (Visual Identity)
主色调：

palace-red: #9b2e2e (宫廷红)

gold-accent: #e6c48f (赤金)

ink-dark: #111111 (玄墨)

paper-bg: #fcfaf5 (宣纸白)

滚动条：自定义超细半透明宫廷红交互滚动条。

📝 开发者手记 (DanDanXia's Notes)
本项目的交互细节经过多次打磨：

合龙加载：每个路由首次进入时触发“筑理合龙”动画。

右键增强：自定义 ContextMenu，在不破坏原生右键功能的前提下集成 AI 分析。

性能优化：大规模使用 will-change 与 GPU 加速，确保 3D 旋转与缩放动画在 60FPS 运行。