import type { AssetAllocation, AllocationSuggestion, InvestmentProduct } from '../types';

// 获取资产配置数据
export const getAssetAllocation = (): AssetAllocation[] => {
  return [
    {
      label: '货币基金',
      value: 25,
      color: '#1E40AF'
    },
    {
      label: '债券基金',
      value: 30,
      color: '#3B82F6'
    },
    {
      label: '股票基金',
      value: 25,
      color: '#60A5FA'
    },
    {
      label: '指数基金',
      value: 15,
      color: '#10B981'
    },
    {
      label: '其他投资',
      value: 5,
      color: '#F59E0B'
    }
  ];
};

// 获取配置优化建议
export const getAllocationSuggestions = (): AllocationSuggestion[] => {
  return [
    {
      id: '1',
      title: '调整股票资产比例',
      description: '当前股票类资产占比25%，建议根据风险承受能力提升至30-35%，以获取更高长期收益。',
      urgency: '中'
    },
    {
      id: '2',
      title: '增加海外资产配置',
      description: '当前投资主要集中在国内市场，建议配置5-10%的海外资产，降低单一市场风险。',
      urgency: '中'
    },
    {
      id: '3',
      title: '优化债券投资结构',
      description: '当前债券组合平均久期较长，建议缩短久期至3-5年，以应对潜在的利率上升风险。',
      urgency: '高'
    }
  ];
};

// 获取投资产品列表
export const getInvestmentProducts = (): InvestmentProduct[] => {
  return [
    {
      id: '1',
      name: '易方达货币市场基金',
      type: '货币基金',
      amount: 320000,
      percentage: 25,
      returnRate: 2.5,
      typeColor: 'bg-primary/10 text-primary',
      code: '000009',
      annualReturn: 2.5
    },
    {
      id: '2',
      name: '广发纯债债券基金',
      type: '债券基金',
      amount: 384000,
      percentage: 30,
      returnRate: 4.8,
      typeColor: 'bg-secondary/10 text-secondary',
      code: '270048',
      annualReturn: 4.8
    },
    {
      id: '3',
      name: '嘉实新兴产业股票基金',
      type: '股票基金',
      amount: 320000,
      percentage: 25,
      returnRate: 12.3,
      typeColor: 'bg-accent/10 text-accent',
      code: '000751',
      annualReturn: 12.3
    },
    {
      id: '4',
      name: '华夏沪深300指数基金',
      type: '指数基金',
      amount: 192000,
      percentage: 15,
      returnRate: 9.7,
      typeColor: 'bg-success/10 text-success',
      code: '000051',
      annualReturn: 9.7
    },
    {
      id: '5',
      name: '银行理财产品',
      type: '其他投资',
      amount: 64000,
      percentage: 5,
      returnRate: 3.6,
      typeColor: 'bg-warning/10 text-warning',
      code: 'B20190422',
      annualReturn: 3.6
    }
  ];
};