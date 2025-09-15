# 家庭财富管家应用

<div align="center">
  <img src="https://img.shields.io/badge/React-18.x-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.x-green.svg" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-cyan.svg" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Chart.js-4.x-yellow.svg" alt="Chart.js">
</div>

## 项目简介

家庭财富管家是一款基于AFP金融理财师专业知识开发的全面家庭财务管理工具，旨在帮助用户进行财务健康评估、个性化理财规划和风险管理。

## 主要功能

- **财务概览**：提供总资产、负债、收入支出等关键财务指标的实时概览
- **月度收支分析**：可视化展示月度收入和支出构成，帮助用户了解资金流向
- **资产配置分析**：分析用户资产分布情况，提供科学的资产配置建议
- **财务自由度计算**：评估当前财务自由状态，预测未来财务自由度发展趋势
- **退休规划模拟**：根据用户输入参数，模拟不同退休规划方案的效果
- **风险管理评估**：评估家庭风险承受能力，提供保险配置建议
- **财务目标设定**：帮助用户设定和追踪中长期财务目标

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 5
- **样式框架**：TailwindCSS 3
- **图表库**：Chart.js
- **代码规范**：ESLint + TypeScript ESLint
- **版本控制**：Git

## 项目结构

```
├── src/
│   ├── components/         # React组件
│   ├── services/           # 业务逻辑服务
│   ├── styles/             # 全局样式
│   ├── types/              # TypeScript类型定义
│   ├── App.tsx             # 应用入口组件
│   └── main.tsx            # 应用主文件
├── public/                 # 静态资源
├── package.json            # 项目依赖
├── tsconfig.json           # TypeScript配置
└── vite.config.ts          # Vite配置
```

## 安装与运行

### 前提条件

确保您已安装以下软件：
- Node.js (v18.x 或更高版本)
- npm (v9.x 或更高版本) 或 yarn/pnpm

### 安装步骤

1. 克隆项目仓库
   ```bash
   git clone https://github.com/iceawake/householdfinanciladvisor.git
   cd householdfinanciladvisor
   ```

2. 安装依赖
   ```bash
   npm install
   # 或使用yarn
   # yarn install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   # 或使用yarn
   # yarn dev
   ```

4. 在浏览器中访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
# 或使用yarn
# yarn build
```

构建后的文件将生成在 `dist` 目录中，可以通过以下命令预览生产版本：

```bash
npm run preview
# 或使用yarn
# yarn preview
```

## 开发指南

### 代码规范

项目使用ESLint和TypeScript进行代码质量控制，请在提交代码前确保没有编译错误和lint警告：

```bash
# 检查TypeScript编译错误
npx tsc -b

# 检查ESLint规则
npx eslint . --ext .ts,.tsx
```

### 组件开发

1. 在 `src/components/` 目录下创建新的组件文件
2. 对于涉及业务逻辑的组件，建议在 `src/services/` 目录下创建对应的服务文件
3. 所有TypeScript类型定义应放在 `src/types/` 目录下

## 功能模块介绍

### 财务概览 (FinancialOverview)
展示用户的总资产、负债、净资产等关键财务指标，并提供与上月的对比数据。

### 月度收支分析 (MonthlyIncomeExpense)
通过图表直观展示用户的月度收入和支出构成，帮助用户了解资金流向，识别可优化的支出项目。

### 资产配置分析 (AssetAllocation)
分析用户的资产分布情况，包括固定资产、流动资产、投资资产等，并提供基于现代投资组合理论的配置建议。

### 财务自由度计算 (FinancialFreedom)
计算用户当前的财务自由度，并通过模拟预测未来的财务自由发展趋势，帮助用户制定实现财务自由的路径。

### 退休规划模拟 (RetirementPlanning)
根据用户输入的当前年龄、预期退休年龄、预期支出等参数，模拟不同投资回报率和储蓄率下的退休资金需求和累积情况。

### 风险管理评估 (RiskManagement)
评估用户的家庭风险承受能力，并根据评估结果提供保险配置建议，包括寿险、重疾险、医疗险等。

### 财务目标设定 (FinancialGoals)
帮助用户设定中长期财务目标，如购房、子女教育、退休等，并跟踪目标的实现进度。

## 数据模拟说明

为了便于演示，本项目使用了模拟数据。在实际应用中，您可以通过修改 `src/services/` 目录下的服务文件，接入真实的财务数据API或数据库。

## 贡献指南

1. Fork 本仓库
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件

## 免责声明

本应用仅作为财务管理的辅助工具，所提供的任何财务建议都不应被视为专业的金融咨询。在做出任何财务决策之前，请咨询专业的金融顾问。

---

© 2024 家庭财富管家团队 - 基于AFP金融理财师专业知识开发
