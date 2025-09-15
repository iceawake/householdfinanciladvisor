// 财务概览数据类型
export interface FinancialOverview {
  totalAssets: number;
  totalLiabilities: number;
  netAssets: number;
  monthlyCashFlow: number;
  assetGrowth: number;
  liabilityGrowth: number;
  netAssetGrowth: number;
  cashFlowGrowth: number;
}

// 资产分布类型
export interface AssetDistribution {
  label: string;
  value: number;
  color: string;
}

// 收支数据类型
export interface IncomeExpenseData {
  month: string;
  income: number;
  expense: number;
}

// 财务目标类型
export interface FinancialGoal {
  id: string;
  title: string;
  name: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  remainingTime: string;
  status: 'inProgress' | 'completed' | 'delayed' | '完成' | '进行中';
  icon: string;
  iconBgColor: string;
  iconColor: string;
  progressColor: string;
  startDate: string;
  targetDate: string;
  type: 'education' | 'housing' | 'retirement';
}

// 资产配置类型
export interface AssetAllocation {
  label: string;
  value: number;
  color: string;
}

// 配置建议类型
export interface AllocationSuggestion {
  id: string;
  title: string;
  description: string;
  urgency: string;
}

// 投资产品类型
export interface InvestmentProduct {
  id: string;
  name: string;
  type: string;
  amount: number;
  percentage: number;
  returnRate: number;
  typeColor: string;
  code: string;
  annualReturn: number;
}

// 保险产品类型
export interface InsuranceProduct {
  id: string;
  name: string;
  type: string;
  coverageAmount: number;
  premium: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
}

// 保险建议类型
export interface InsuranceSuggestion {
  id: string;
  title: string;
  description: string;
  coverageGap: number;
  urgency: string;
}

// 退休规划数据类型
export interface RetirementPlan {
  currentSavings: number;
  expectedSavingsAtRetirement: number;
  currentAnnualExpense: number;
  inflationRate: number;
  postRetirementExpenseRatio: number;
  expectedRetirementAge: number;
  requiredAnnualExpense: number;
  fundingGap: number;
  suggestedMonthlyIncrease: number;
  birthDate: string;
  targetAmount: number;
}

// 退休预测数据类型
export interface RetirementProjection {
  year: string;
  amount: number;
  savings: number;
  target: number;
}

// 退休规划建议类型
export interface RetirementSuggestion {
  id: string;
  title: string;
  description: string;
  urgency: string;
}

// 财务自由度数据类型
export interface FinancialFreedom {
  currentLevel: number; // 当前财务自由度百分比
  monthlyPassiveIncome: number; // 每月被动收入
  monthlyExpense: number; // 每月支出
  freedomRatio: number; // 被动收入与支出的比率
  targetFreedomLevel: number; // 目标财务自由度百分比
  yearsToFreedom: number; // 预计达到财务自由所需年数
  requiredPassiveIncome: number; // 达到财务自由所需的被动收入
}

// 财务自由度构成类型
export interface FreedomComponent {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

// 财务自由度建议类型
export interface FreedomSuggestion {
  id: string;
  title: string;
  description: string;
  impact: string; // 影响程度: high, medium, low
  urgency: string;
}