import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getFinancialOverview, getAssetDistribution } from '../services/financialOverviewService';

// 注册Chart.js组件
ChartJS.register(ArcElement, Tooltip, Legend);

const FinancialOverview: React.FC = () => {
  // 获取财务概览数据
  const financialData = getFinancialOverview();
  const assetDistributionData = getAssetDistribution();

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
    labels: assetDistributionData.map(item => item.label),
    datasets: [
      {
        data: assetDistributionData.map(item => item.value),
        backgroundColor: assetDistributionData.map(item => item.color),
        borderWidth: 0
      }
    ]
  };

  // 图表配置选项
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '70%'
  };

  return (
    <section id="overview" className="mb-16 fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center mb-8 gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <i className="fa fa-dashboard text-xl text-primary"></i>
        </div>
        <h2 className="text-2xl font-bold text-neutral">财务概览</h2>
      </div>
      
      {/* 数据卡片网格 - 使用更合适的响应式布局 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* 总资产 */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-neutral-light font-medium text-sm">总资产</p>
              <h3 className="text-2xl font-bold mt-1 break-words">{formatCurrency(financialData.totalAssets)}</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <i className="fa fa-money text-primary text-xl"></i>
            </div>
          </div>
          <div className="flex items-center text-success">
            <i className="fa fa-arrow-up mr-1"></i>
            <span className="text-sm font-medium">{financialData.assetGrowth}% 较上月</span>
          </div>
        </div>
        
        {/* 总负债 */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-neutral-light font-medium text-sm">总负债</p>
              <h3 className="text-2xl font-bold mt-1 break-words">{formatCurrency(financialData.totalLiabilities)}</h3>
            </div>
            <div className="bg-danger/10 p-3 rounded-full">
              <i className="fa fa-university text-danger text-xl"></i>
            </div>
          </div>
          <div className="flex items-center text-danger">
            <i className="fa fa-arrow-up mr-1"></i>
            <span className="text-sm font-medium">{financialData.liabilityGrowth}% 较上月</span>
          </div>
        </div>
        
        {/* 净资产 */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-neutral-light font-medium text-sm">净资产</p>
              <h3 className="text-2xl font-bold mt-1 break-words">{formatCurrency(financialData.netAssets)}</h3>
            </div>
            <div className="bg-success/10 p-3 rounded-full">
              <i className="fa fa-balance-scale text-success text-xl"></i>
            </div>
          </div>
          <div className="flex items-center text-success">
            <i className="fa fa-arrow-up mr-1"></i>
            <span className="text-sm font-medium">{financialData.netAssetGrowth}% 较上月</span>
          </div>
        </div>
        
        {/* 月现金流 */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-neutral-light font-medium text-sm">月现金流</p>
              <h3 className="text-2xl font-bold mt-1 break-words">{formatCurrency(financialData.monthlyCashFlow)}</h3>
            </div>
            <div className="bg-accent/10 p-3 rounded-full">
              <i className="fa fa-exchange text-accent text-xl"></i>
            </div>
          </div>
          <div className="flex items-center text-success">
            <i className="fa fa-arrow-up mr-1"></i>
            <span className="text-sm font-medium">{financialData.cashFlowGrowth}% 较上月</span>
          </div>
        </div>
      </div>
      
      {/* 图表和健康度评分区域 - 改进布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 资产分布图 */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">资产分布</h3>
            <div className="flex space-x-2">
              <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">当前</button>
              <button className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-primary/10 hover:text-primary transition-custom">历史</button>
            </div>
          </div>
          <div className="chart-container h-[250px]">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {assetDistributionData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-neutral-light truncate">{item.label}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 财务健康度评分 */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">财务健康度评分</h3>
            <span className="text-xs bg-success/10 text-success px-3 py-1 rounded-full">良好</span>
          </div>
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              {/* 圆形进度条 */}
              <svg className="w-40 h-40" viewBox="0 0 100 100">
                {/* 背景圆环 */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                {/* 进度圆环 */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset="70"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              {/* 评分数字 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-success">75</span>
                <span className="text-xs text-neutral-light">/ 100分</span>
              </div>
            </div>
          </div>
          {/* 评分项 */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">资产负债率</span>
                <span className="text-sm">良好</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">储蓄率</span>
                <span className="text-sm">优秀</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">紧急备用金</span>
                <span className="text-sm">良好</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">投资回报率</span>
                <span className="text-sm">一般</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialOverview;