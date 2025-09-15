import type { InsuranceProduct, InsuranceSuggestion } from '../types';

// 获取保险产品列表
export const getInsuranceProducts = (): InsuranceProduct[] => {
  return [
    {
      id: '1',
      name: '平安福终身寿险',
      type: '寿险',
      coverageAmount: 2000000,
      premium: 12000,
      expiryDate: '终身',
      status: 'active'
    },
    {
      id: '2',
      name: '中国人保重大疾病保险',
      type: '重疾险',
      coverageAmount: 1500000,
      premium: 8000,
      expiryDate: '终身',
      status: 'active'
    },
    {
      id: '3',
      name: '泰康住院医疗保险',
      type: '医疗险',
      coverageAmount: 500000,
      premium: 3000,
      expiryDate: '2024-12-31',
      status: 'active'
    },
    {
      id: '4',
      name: '友邦意外伤害保险',
      type: '意外险',
      coverageAmount: 1000000,
      premium: 1500,
      expiryDate: '2024-12-31',
      status: 'active'
    }
  ];
};

// 获取保险建议
export const getInsuranceSuggestions = (): InsuranceSuggestion[] => {
  return [
    {
      id: '1',
      title: '增加定期寿险保额',
      description: '当前家庭责任期内，建议将定期寿险保额提升至年收入的10-12倍，以覆盖家庭负债和未来支出。',
      coverageGap: 1000000,
      urgency: '高'
    },
    {
      id: '2',
      title: '补充子女教育金保险',
      description: '建议为子女配置教育金保险，确保教育资金安全稳定，不受市场波动影响。',
      coverageGap: 500000,
      urgency: '中'
    },
    {
      id: '3',
      title: '考虑家庭财产保险',
      description: '建议为家庭主要财产（房产、车辆等）配置全面的财产保险，防范意外损失风险。',
      coverageGap: 300000,
      urgency: '低'
    }
  ];
};