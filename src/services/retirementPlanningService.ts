import type { RetirementPlan, RetirementProjection, RetirementSuggestion } from '../types';

// 获取退休规划数据
export const getRetirementPlan = (): RetirementPlan => {
  return {
    currentSavings: 750000,
    expectedSavingsAtRetirement: 4450000,
    currentAnnualExpense: 150000,
    inflationRate: 3,
    postRetirementExpenseRatio: 70,
    expectedRetirementAge: 60,
    requiredAnnualExpense: 105000,
    fundingGap: 500000,
    suggestedMonthlyIncrease: 3500,
    birthDate: '1980-01-01',
    targetAmount: 4500000
  };
};

// 获取退休资金预测数据
export const getRetirementProjections = (): RetirementProjection[] => {
  return [
    {
      year: '现在',
      amount: 75,
      savings: 75,
      target: 450
    },
    {
      year: '5年',
      amount: 110,
      savings: 110,
      target: 450
    },
    {
      year: '10年',
      amount: 155,
      savings: 155,
      target: 450
    },
    {
      year: '15年',
      amount: 210,
      savings: 210,
      target: 450
    },
    {
      year: '20年',
      amount: 275,
      savings: 275,
      target: 450
    },
    {
      year: '25年',
      amount: 350,
      savings: 350,
      target: 450
    },
    {
      year: '30年',
      amount: 445,
      savings: 445,
      target: 450
    }
  ];
};

// 获取退休规划建议
export const getRetirementSuggestions = (): RetirementSuggestion[] => {
  return [
    {
      id: '1',
      title: '增加每月退休储蓄',
      description: '根据测算，建议每月增加退休储蓄¥3,500，可通过提高储蓄率或增加投资收益实现。',
      urgency: '高'
    },
    {
      id: '2',
      title: '优化退休投资组合',
      description: '建议增加权益类资产配置比例至40%，并考虑配置一些养老目标基金，提高长期收益潜力。',
      urgency: '中'
    },
    {
      id: '3',
      title: '考虑延迟退休',
      description: '如延迟退休至65岁，可显著减少资金缺口约¥800,000，并增加养老金领取金额。',
      urgency: '低'
    }
  ];
};