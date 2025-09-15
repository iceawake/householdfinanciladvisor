import type { FinancialOverview, AssetDistribution, IncomeExpenseData } from '../types';

// 获取财务概览数据
export const getFinancialOverview = (): FinancialOverview => {
  return {
    totalAssets: 1280000,
    totalLiabilities: 430000,
    netAssets: 850000,
    monthlyCashFlow: 12500,
    assetGrowth: 8.2,
    liabilityGrowth: 2.3,
    netAssetGrowth: 12.5,
    cashFlowGrowth: 5.7
  };
};

// 获取资产分布数据
export const getAssetDistribution = (): AssetDistribution[] => {
  return [
    {
      label: '现金及等价物',
      value: 20,
      color: '#1E40AF'
    },
    {
      label: '投资资产',
      value: 40,
      color: '#3B82F6'
    },
    {
      label: '自用资产',
      value: 35,
      color: '#60A5FA'
    },
    {
      label: '其他资产',
      value: 5,
      color: '#10B981'
    }
  ];
};

// 获取月度收支数据
export const getMonthlyIncomeExpense = (): IncomeExpenseData[] => {
  return [
    {
      month: '1月',
      income: 35000,
      expense: 22000
    },
    {
      month: '2月',
      income: 37000,
      expense: 24000
    },
    {
      month: '3月',
      income: 36000,
      expense: 21000
    },
    {
      month: '4月',
      income: 38000,
      expense: 23000
    },
    {
      month: '5月',
      income: 35000,
      expense: 22000
    },
    {
      month: '6月',
      income: 39000,
      expense: 24000
    }
  ];
};