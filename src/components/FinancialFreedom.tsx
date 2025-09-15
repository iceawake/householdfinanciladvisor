import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { getFinancialFreedomData, getFreedomComponents, getFreedomSuggestions, getFreedomProjection } from '../services/financialFreedomService';

// 注册Chart.js组件
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title
);

const FinancialFreedom: React.FC = () => {
  // 获取财务自由度数据
  const freedomData = getFinancialFreedomData();
  const freedomComponents = getFreedomComponents();
  const freedomSuggestions = getFreedomSuggestions();
  const freedomProjection = getFreedomProjection(freedomData.currentLevel, freedomData.yearsToFreedom);

  // 格式化数字为货币格式
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      maximumFractionDigits: 0
    }).format(value);
  };

  // 被动收入构成图表数据
  const componentsChartData = {
    labels: freedomComponents.map(item => item.label),
    datasets: [
      {
        data: freedomComponents.map(item => item.value),
        backgroundColor: freedomComponents.map(item => item.color),
        borderWidth: 0
      }
    ]
  };

  // 图表配置选项
  const componentsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = formatCurrency(context.raw as number);
            const percentage = freedomComponents[context.dataIndex].percentage;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%'
  };

  // 财务自由度预测图表数据
  const projectionChartData = {
    labels: freedomProjection.map(item => item.year),
    datasets: [
      {
        label: '财务自由度预测',
        data: freedomProjection.map(item => item.level),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  // 预测图表配置选项
  const projectionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw as number;
            return `自由度: ${value}%`;
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
        ticks: {
          callback: function(value: string | number) {
            return value + '%';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  // 获取财务自由度状态
  const getFreedomStatus = (level: number): { text: string; color: string } => {
    if (level < 30) return { text: '初步阶段', color: 'text-warning' };
    if (level < 70) return { text: '成长阶段', color: 'text-primary' };
    if (level < 100) return { text: '接近自由', color: 'text-info' };
    return { text: '财务自由', color: 'text-success' };
  };

  // 获取建议影响程度对应的颜色
  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'high': return 'bg-danger/10 text-danger';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'low': return 'bg-info/10 text-info';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  // 获取建议紧急程度对应的颜色
  const getUrgencyColor = (urgency: string): string => {
    switch (urgency) {
      case '高': return 'bg-danger/10 text-danger';
      case '中': return 'bg-warning/10 text-warning';
      case '低': return 'bg-info/10 text-info';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <section id="financial-freedom" className="mb-16 fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center mb-8 gap-3">
        <div className="bg-info/10 p-2 rounded-lg">
          <i className="fa fa-bird text-xl text-info"></i>
        </div>
        <h2 className="text-2xl font-bold text-neutral">财务自由度</h2>
      </div>

      {/* 数据卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* 财务自由度 */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-neutral-light font-medium text-sm">当前财务自由度</p>
              <h3 className="text-2xl font-bold mt-1 break-words">{freedomData.currentLevel}%</h3>
            </div>
            <div className="bg-info/10 p-3 rounded-full">
              <i className="fa fa-balance-scale text-info text-xl"></i>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${getFreedomStatus(freedomData.currentLevel).color}`}>
              {getFreedomStatus(freedomData.currentLevel).text}
            </span>
          </div>
        </div>

        {/* 每月被动收入 */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-neutral-light font-medium text-sm">每月被动收入</p>
              <h3 className="text-2xl font-bold mt-1 break-words">{formatCurrency(freedomData.monthlyPassiveIncome)}</h3>
            </div>
            <div className="bg-success/10 p-3 rounded-full">
              <i className="fa fa-leaf text-success text-xl"></i>
            </div>
          </div>
          <div className="flex items-center text-success">
            <span className="text-sm font-medium">占支出的 {Math.round(freedomData.freedomRatio * 100)}%</span>
          </div>
        </div>

        {/* 每月支出 */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-neutral-light font-medium text-sm">每月总支出</p>
              <h3 className="text-2xl font-bold mt-1 break-words">{formatCurrency(freedomData.monthlyExpense)}</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <i className="fa fa-shopping-cart text-primary text-xl"></i>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-neutral-light">维持当前生活水平</span>
          </div>
        </div>

        {/* 预计达到财务自由所需年数 */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-neutral-light font-medium text-sm">预计达到财务自由</p>
              <h3 className="text-2xl font-bold mt-1 break-words">{freedomData.yearsToFreedom} 年</h3>
            </div>
            <div className="bg-warning/10 p-3 rounded-full">
              <i className="fa fa-calendar-check-o text-warning text-xl"></i>
            </div>
          </div>
          <div className="flex items-center text-neutral-light">
            <span className="text-sm font-medium">按当前增长趋势</span>
          </div>
        </div>
      </div>

      {/* 图表和详情区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* 被动收入构成 */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">被动收入构成</h3>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">当前</span>
          </div>
          <div className="chart-container h-[300px]">
            <Doughnut data={componentsChartData} options={componentsChartOptions} />
          </div>
        </div>

        {/* 财务自由度预测 */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">财务自由度预测</h3>
            <span className="text-xs bg-info/10 text-info px-3 py-1 rounded-full">未来15年</span>
          </div>
          <div className="chart-container h-[300px]">
            <Line data={projectionChartData} options={projectionChartOptions} />
          </div>
          {/* 财务自由里程碑线 */}
          <div className="relative h-12 mt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-gray-200"></div>
            </div>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="bg-success/10 text-success text-xs px-3 py-1 rounded-full">
                财务自由 (100%)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 财务自由度建议 */}
      <div className="card">
        <div className="flex items-center mb-6">
          <h3 className="font-bold text-lg">提升财务自由度建议</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {freedomSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex flex-col p-4 border border-gray-100 rounded-lg hover:shadow-md transition-custom">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-base">{suggestion.title}</h4>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getImpactColor(suggestion.impact)}`}>
                    {suggestion.impact === 'high' ? '高影响' : suggestion.impact === 'medium' ? '中影响' : '低影响'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getUrgencyColor(suggestion.urgency)}`}>
                    {suggestion.urgency}
                  </span>
                </div>
              </div>
              <p className="text-sm text-neutral-light">{suggestion.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancialFreedom;