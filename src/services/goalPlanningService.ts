import type { FinancialGoal } from '../types';

// 获取财务目标数据
export const getFinancialGoals = (): FinancialGoal[] => {
  return [
    {
      id: '1',
      title: '子女教育',
      name: '子女教育',
      description: '为子女大学教育基金做准备',
      currentAmount: 250000,
      targetAmount: 500000,
      progress: 50,
      remainingTime: '5年',
      status: 'inProgress',
      icon: 'fa-graduation-cap',
      iconBgColor: 'bg-secondary/10',
      iconColor: 'text-secondary',
      progressColor: 'bg-secondary',
      startDate: '2023-01-01',
      targetDate: '2028-01-01',
      type: 'education'
    },
    {
      id: '2',
      title: '购房首付',
      name: '购房首付',
      description: '购买改善型住房首付',
      currentAmount: 400000,
      targetAmount: 1000000,
      progress: 40,
      remainingTime: '8年',
      status: 'inProgress',
      icon: 'fa-home',
      iconBgColor: 'bg-accent/10',
      iconColor: 'text-accent',
      progressColor: 'bg-accent',
      startDate: '2021-01-01',
      targetDate: '2029-01-01',
      type: 'housing'
    },
    {
      id: '3',
      title: '退休储备',
      name: '退休储备',
      description: '为舒适退休生活准备资金',
      currentAmount: 750000,
      targetAmount: 2500000,
      progress: 30,
      remainingTime: '15年',
      status: 'inProgress',
      icon: 'fa-sun-o',
      iconBgColor: 'bg-success/10',
      iconColor: 'text-success',
      progressColor: 'bg-success',
      startDate: '2020-01-01',
      targetDate: '2035-01-01',
      type: 'retirement'
    }
  ];
};