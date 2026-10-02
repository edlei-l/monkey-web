# 🦍 Kibo the Gorilla - 个人主页、计数器与 Gorilla 12 Points 游戏

这是一个关于大猩猩 **Kibo** 的个性化响应式网页，集成了 Kibo 的个人介绍、互动按钮、Gorilla Counter 计数器，以及一个基于**虚拟积分**的 **Gorilla 12 Points（12点）小游戏**。

---

## ✨ 功能特点

### 🦍 大猩猩个人主页

展示大猩猩 Kibo 的图片与自我介绍，介绍 Kibo 的生活习性、饮食、族群生活以及野生动物保护等内容。

### 🔢 互动计数器（Gorilla Counter）

* **INCREMENT（加数）**：点击按钮增加大猩猩计数。
* **SAVE（保存）**：将当前计数保存到历史记录，并将计数器归零。
* **Previous Counts**：显示之前保存的计数数据。

### 🎮 Gorilla 12 Points 12点小游戏

网页加入了一个以 Kibo 为主题的 12 点小游戏。

游戏规则：

* 玩家开始游戏后获得初始卡牌。
* 每张牌拥有不同的点数。
* 玩家可以选择继续 **DRAW CARD**（抽牌）。
* 玩家需要尽量接近 **12 点**。
* 如果超过 12 点，则本局失败。
* 玩家停止抽牌后，由 Kibo 自动进行抽牌。
* 最后比较玩家和 Kibo 谁更加接近 12 点。
* 玩家可以获得 **WIN（胜利）**、**LOSE（失败）** 或 **DRAW（平局）** 的结果。
* 游戏使用网页中的**虚拟 Gorilla Points** 进行游戏，不涉及真实货币。

### 🪙 虚拟积分系统

玩家初始拥有一定数量的 Gorilla Points。

通过游戏结果更新虚拟积分：

* **WIN**：获得虚拟积分奖励。
* **LOSE**：扣除本局使用的虚拟积分。
* **DRAW**：返还本局虚拟积分。

### 🎵 音效反馈

网站支持游戏音效与按钮音效，例如：

* 开始游戏音效
* 抽牌音效
* 大猩猩行动音效
* 胜利音效
* 失败音效
* 平局音效
* 计数器按钮音效

音效可以通过 **HTML5 Audio API** 加载本地音频文件。

### 🌲 森林主题视觉设计

采用深绿色、灰绿色等自然色调，结合：

* Flexbox 弹性布局
* 卡片式设计
* 圆角
* 阴影
* 渐变
* Hover 悬停动画
* 响应式布局

使网页适合在电脑和移动设备上使用。

---

## 🛠️ 技术栈

### HTML5

负责网页整体结构，包括：

* 个人介绍
* 图片
* 按钮
* 输入框
* Gorilla Counter
* Gorilla 12 Points 游戏区域

### CSS3

负责网页视觉设计，包括：

* Flexbox
* Responsive Design
* Card Design
* Border Radius
* Box Shadow
* Gradient
* Transition
* Hover Animation

### JavaScript（ES6+）

负责网页的动态功能，包括：

* DOM 操作
* Gorilla Counter 计数
* SAVE 历史记录
* 随机生成游戏卡牌
* 计算玩家点数
* 计算 Kibo 点数
* 判断胜负
* 虚拟积分计算
* 按钮事件监听

### HTML5 Audio API

负责网页中的音效播放，例如：

```javascript
const cardSound = new Audio("music/card.mp3");

cardSound.currentTime = 0;
cardSound.play();
```

---

## 📁 项目目录结构

```text
monkey-web/
│
├── index.html          # 网页主体结构
│
├── styles.css          # 森林主题 CSS 样式
│
├── index.js            # 计数器、12点游戏与交互逻辑
│
├── images/
│   └── kobi-left.webp  # Kibo 大猩猩图片
│
└── music/
    ├── coin.mp3        # 计数器/点击音效
    ├── wow.mp3         # 保存音效
    ├── start.mp3       # 游戏开始音效
    ├── card.mp3        # 抽牌音效
    ├── gorilla.mp3     # Kibo 音效
    ├── win.mp3         # 胜利音效
    ├── lose.mp3        # 失败音效
    └── draw.mp3        # 平局音效
```

---

## 🎯 项目目标

本项目通过大猩猩 Kibo 的主题设计，将 HTML、CSS 和 JavaScript 的基础知识结合起来，实现一个具有**个人主页、互动计数器、音效反馈以及小游戏**的完整网页。

通过项目可以练习：

* HTML 页面结构设计
* CSS 页面美化
* JavaScript 变量与函数
* DOM 元素操作
* 随机数生成
* 条件判断
* 事件监听
* 游戏状态管理
* Audio 音效控制

整个项目以 Kibo 大猩猩为主题，让普通的网页练习变成一个具有互动性的小游戏网站。
