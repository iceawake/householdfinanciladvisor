import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getMonthlyIncomeExpense } from '../services/financialOverviewService';

// 注册Chart.js组件
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyIncomeExpense: React.FC = () => {
  const incomeExpenseData = getMonthlyIncomeExpense();

  // 格式化数字为货币格式
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      maximumFractionDigits: 0
    }).format(value);
  };

  // 图表数据配置
  const chartData = {
    labels: incomeExpenseData.map(item => item.month),
    datasets: [
      {
        label: '收入',
        data: incomeExpenseData.map(item => item.income),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: '支出',
        data: incomeExpenseData.map(item => item.expense),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // 图表配置选项
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
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
              return '¥' + Number(value).toLocaleString();
            }
          }
      }
    }
  };

  // 计算总收入和总支出
  const totalIncome = incomeExpenseData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = incomeExpenseData.reduce((sum, item) => sum + item.expense, 0);
  const savingsRate = ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1);

  return (
    <section id="income-expense" className="mb-16">
      <div className="flex items-center mb-8">
        <i className="fa fa-line-chart text-2xl text-primary mr-3"></i>
        <h2 className="text-2xl font-bold text-neutral">月度收支趋势</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 收入支出趋势图表 */}
        <div className="card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">收支趋势</h3>
            <div className="flex space-x-2">
              <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">近6个月</button>
              <button className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-primary/10 hover:text-primary transition-custom">近12个月</button>
              <button className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-primary/10 hover:text-primary transition-custom">自定义</button>
            </div>
          </div>
          <div className="chart-container h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        
        {/* 收支概览卡片 */}
        <div className="card">
          <h3 className="font-bold text-lg mb-6">收支概览</h3>
          
          <div className="space-y-6">
            {/* 总收入 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-light">总收入</span>
                <span className="font-bold text-success">{formatCurrency(totalIncome)}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            {/* 总支出 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-light">总支出</span>
                <span className="font-bold text-danger">{formatCurrency(totalExpense)}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-danger h-2 rounded-full" style={{ width: `${(totalExpense / totalIncome) * 100}%` }}></div>
              </div>
            </div>
            
            {/* 储蓄率 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-light">储蓄率</span>
                <span className="font-bold text-accent">{savingsRate}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: `${savingsRate}%` }}></div>
              </div>
            </div>
            
            {/* 本月结余 */}
            <div className="p-4 bg-accent/5 rounded-lg">
              <p className="text-sm text-neutral-light mb-1">本月结余</p>
              <p className="text-xl font-bold text-accent">{formatCurrency(incomeExpenseData[incomeExpenseData.length - 1].income - incomeExpenseData[incomeExpenseData.length - 1].expense)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyIncomeExpense;