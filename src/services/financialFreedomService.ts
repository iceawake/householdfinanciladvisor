import type { FinancialFreedom, FreedomComponent, FreedomSuggestion } from '../types';

// 获取财务自由度数据
export const getFinancialFreedomData = (): FinancialFreedom => {
  return {
    currentLevel: 35, // 当前财务自由度为35%
    monthlyPassiveIncome: 8750, // 每月被动收入8750元
    monthlyExpense: 25000, // 每月支出25000元
    freedomRatio: 0.35, // 被动收入占支出的35%
    targetFreedomLevel: 100, // 目标财务自由度100%
    yearsToFreedom: 12, // 预计12年达到财务自由
    requiredPassiveIncome: 25000 // 达到财务自由所需的被动收入
  };
};

// 获取财务自由度构成数据
export const getFreedomComponents = (): FreedomComponent[] => {
  return [
    {
      label: '投资收益',
      value: 4200,
      color: '#10B981',
      percentage: 48
    },
    {
      label: '租金收入',
      value: 3000,
      color: '#3B82F6',
      percentage: 34
    },
    {
      label: '利息收入',
      value: 1050,
      color: '#F59E0B',
      percentage: 12
    },
    {
      label: '其他被动收入',
      value: 500,
      color: '#6366F1',
      percentage: 6
    }
  ];
};

// 获取财务自由度建议
export const getFreedomSuggestions = (): FreedomSuggestion[] => {
  return [
    {
      id: '1',
      title: '增加投资组合多元化',
      description: '考虑配置更多类型的资产以提高被动收入稳定性',
      impact: 'high',
      urgency: '高'
    },
    {
      id: '2',
      title: '优化房产投资',
      description: '评估现有房产回报率，考虑调整租金或进行房产升级',
      impact: 'medium',
      urgency: '中'
    },
    {
      id: '3',
      title: '探索副业收入机会',
      description: '发展与专业相关的副业，创造额外被动收入来源',
      impact: 'medium',
      urgency: '中'
    },
    {
      id: '4',
      title: '控制生活支出',
      description: '分析每月支出结构，寻找可优化的空间',
      impact: 'low',
      urgency: '低'
    }
  ];
};

// 计算财务自由度预测数据
export const getFreedomProjection = (currentLevel: number, yearsToFreedom: number) => {
  const projections = [];
  const currentYear = new Date().getFullYear();
  
  // 生成未来15年的预测数据
  for (let i = 0; i <= 15; i++) {
    const year = currentYear + i;
    let projectedLevel;
    
    // 前yearsToFreedom年加速增长，之后保持稳定增长
    if (i < yearsToFreedom) {
      // 计算非线性增长曲线
      const progress = i / yearsToFreedom;
      projectedLevel = currentLevel + (100 - currentLevel) * (1 - Math.pow(1 - progress, 2));
    } else {
      // 达到财务自由后，每年增长2%
      projectedLevel = Math.min(100 + (i - yearsToFreedom) * 2, 150);
    }
    
    projections.push({
      year: year.toString(),
      level: Math.round(projectedLevel)
    });
  }
  
  return projections;
};