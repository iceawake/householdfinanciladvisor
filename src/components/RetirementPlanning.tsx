import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getRetirementPlan, getRetirementProjections, getRetirementSuggestions } from '../services/retirementPlanningService';

// 注册Chart.js组件
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const RetirementPlanning: React.FC = () => {
  const retirementPlan = getRetirementPlan();
  const retirementProjections = getRetirementProjections();
  const retirementSuggestions = getRetirementSuggestions();
  
  // 生活需求测算的状态
  const [monthlyExpense, setMonthlyExpense] = useState(10000);
  const [inflationRate, setInflationRate] = useState(3);
  const [investmentReturn, setInvestmentReturn] = useState(6);
  const [retirementAge, setRetirementAge] = useState(60);

  // 格式化数字为货币格式
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      maximumFractionDigits: 0
    }).format(value);
  };

  // 计算当前年龄
  const calculateCurrentAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // 计算退休所需资金
  const calculateRetirementFund = () => {
    const currentAge = calculateCurrentAge(retirementPlan.birthDate);
    const yearsToRetirement = retirementAge - currentAge;
    const retirementYears = 25; // 假设退休后生活25年
    
    // 考虑通胀后的每月支出
    const inflatedMonthlyExpense = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    
    // 使用现值公式计算所需总资金
    let totalFund = 0;
    for (let i = 0; i < retirementYears * 12; i++) {
      // 每月支出考虑通胀，投资回报考虑复利
      const discountRate = (1 + investmentReturn / 100) ** (i / 12);
      const inflatedExpense = inflatedMonthlyExpense * Math.pow(1 + inflationRate / 100, i / 12);
      totalFund += inflatedExpense / discountRate;
    }
    
    return totalFund;
  };

  // 图表数据配置
  const chartData = {
    labels: retirementProjections.map(item => item.year),
    datasets: [
      {
        label: '退休储备金',
        data: retirementProjections.map(item => item.savings),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: '目标金额',
        data: retirementProjections.map(item => item.target),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0)',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  };

  // 图表配置选项
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
            callback: function(value: string | number) {
              return '¥' + (Number(value) / 10000) + '万';
            }
          }
      }
    }
  };

  // 当前年龄和距离退休的时间
  const currentAge = calculateCurrentAge(retirementPlan.birthDate);
  const yearsToRetirement = retirementAge - currentAge;
  const requiredFund = calculateRetirementFund();
  const monthlySavings = requiredFund / (yearsToRetirement * 12);

  return (
    <section id="retirement" className="mb-16">
      <div className="flex items-center mb-8">
        <i className="fa fa-users text-2xl text-primary mr-3"></i>
        <h2 className="text-2xl font-bold text-neutral">退休规划</h2>
      </div>
      
      {/* 退休概览卡片 */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm text-neutral-light mb-1">当前年龄</h4>
            <p className="text-2xl font-bold">{currentAge}岁</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="text-sm text-neutral-light mb-1">目标退休年龄</h4>
            <p className="text-2xl font-bold">{retirementAge}岁</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="text-sm text-neutral-light mb-1">距离退休</h4>
            <p className="text-2xl font-bold">{yearsToRetirement}年</p>
          </div>
          <div className="p-4 bg-primary/5 rounded-lg">
            <h4 className="text-sm text-neutral-light mb-1">已储备金额</h4>
            <p className="text-2xl font-bold">{formatCurrency(retirementPlan.currentSavings)}</p>
          </div>
        </div>
      </div>
      
      {/* 退休资金预测和生活需求测算 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 退休资金预测图表 */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">退休资金预测</h3>
            <div className="flex space-x-2">
              <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">默认场景</button>
              <button className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-primary/10 hover:text-primary transition-custom">保守场景</button>
              <button className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-primary/10 hover:text-primary transition-custom">乐观场景</button>
            </div>
          </div>
          <div className="chart-container h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm">目标达成率</span>
              <span className="font-medium">{Math.round((retirementPlan.currentSavings / retirementPlan.targetAmount) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ width: `${Math.min((retirementPlan.currentSavings / retirementPlan.targetAmount) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* 退休生活需求测算 */}
        <div className="card">
          <h3 className="font-bold text-lg mb-6">退休生活需求测算</h3>
          
          {/* 滑块控件 */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">每月期望支出</span>
                <span className="font-medium">{formatCurrency(monthlyExpense)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="30000"
                step="1000"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-neutral-light mt-1">
                <span>¥5,000</span>
                <span>¥30,000</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">预计通胀率</span>
                <span className="font-medium">{inflationRate}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-neutral-light mt-1">
                <span>1%</span>
                <span>6%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">预期投资回报率</span>
                <span className="font-medium">{investmentReturn}%</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="0.5"
                value={investmentReturn}
                onChange={(e) => setInvestmentReturn(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-neutral-light mt-1">
                <span>3%</span>
                <span>10%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">目标退休年龄</span>
                <span className="font-medium">{retirementAge}岁</span>
              </div>
              <input
                type="range"
                min="50"
                max="70"
                step="1"
                value={retirementAge}
                onChange={(e) => setRetirementAge(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-neutral-light mt-1">
                <span>50岁</span>
                <span>70岁</span>
              </div>
            </div>
          </div>
          
          {/* 测算结果 */}
          <div className="mt-8 p-4 bg-accent/5 rounded-lg">
            <h4 className="font-medium mb-4">测算结果</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-light mb-1">所需退休资金</p>
                <p className="text-lg font-bold text-accent">{formatCurrency(requiredFund)}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-light mb-1">每月需储蓄</p>
                <p className="text-lg font-bold text-accent">{formatCurrency(monthlySavings)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 退休规划建议 */}
      <div className="card mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">退休规划建议</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">专家建议</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {retirementSuggestions.map((suggestion, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-custom">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{suggestion.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${suggestion.urgency === '高' ? 'bg-danger/10 text-danger' : suggestion.urgency === '中' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                  {suggestion.urgency}优先级
                </span>
              </div>
              <p className="text-sm text-neutral-light mb-3">{suggestion.description}</p>
              <div className="flex space-x-2">
                <button className="text-xs px-3 py-1 bg-primary text-white rounded-full hover:bg-primary-dark transition-custom">
                  采纳建议
                </button>
                <button className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-custom">
                  忽略
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RetirementPlanning;