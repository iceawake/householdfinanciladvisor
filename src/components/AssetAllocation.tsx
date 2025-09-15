import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getAssetAllocation, getAllocationSuggestions, getInvestmentProducts } from '../services/assetAllocationService';

// 注册Chart.js组件
ChartJS.register(ArcElement, Tooltip, Legend);

const AssetAllocation: React.FC = () => {
  const assetAllocationData = getAssetAllocation();
  const allocationSuggestions = getAllocationSuggestions();
  const investmentProducts = getInvestmentProducts();

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
    labels: assetAllocationData.map(item => item.label),
    datasets: [
      {
        data: assetAllocationData.map(item => item.value),
        backgroundColor: assetAllocationData.map(item => item.color),
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

  // 计算总资产
  const totalAssets = assetAllocationData.reduce((sum, item) => sum + item.value, 0);

  return (
    <section id="asset-allocation" className="mb-16">
      <div className="flex items-center mb-8">
        <i className="fa fa-pie-chart text-2xl text-primary mr-3"></i>
        <h2 className="text-2xl font-bold text-neutral">资产配置</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 资产配置饼图 */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">当前资产配置</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">按价值</span>
          </div>
          <div className="chart-container h-48">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="space-y-3 mt-6">
            {assetAllocationData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-neutral-light">{item.label}</span>
                  </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatCurrency(item.value)}</p>
                  <p className="text-xs text-neutral-light">{((item.value / totalAssets) * 100).toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 配置优化建议 */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">配置优化建议</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">专家建议</span>
          </div>
          <div className="space-y-4">
            {allocationSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 bg-accent/5 rounded-lg">
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
        
        {/* 投资组合表现 */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">投资组合表现</h3>
            <div className="flex space-x-2">
              <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">本月</button>
              <button className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-primary/10 hover:text-primary transition-custom">本年</button>
              <button className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-primary/10 hover:text-primary transition-custom">累计</button>
            </div>
          </div>
          
          {/* 业绩图表容器 - 这里使用占位符，实际项目中可以使用Line图表 */}
          <div className="bg-gray-50 h-48 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <i className="fa fa-bar-chart text-2xl text-gray-300 mb-2"></i>
              <p className="text-sm text-gray-400">业绩图表</p>
            </div>
          </div>
          
          {/* 业绩指标 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-success/5 rounded-lg">
              <p className="text-xs text-neutral-light mb-1">年化收益率</p>
              <p className="text-lg font-bold text-success">8.2%</p>
            </div>
            <div className="p-3 bg-accent/5 rounded-lg">
              <p className="text-xs text-neutral-light mb-1">波动率</p>
              <p className="text-lg font-bold text-accent">12.5%</p>
            </div>
            <div className="p-3 bg-primary/5 rounded-lg">
              <p className="text-xs text-neutral-light mb-1">夏普比率</p>
              <p className="text-lg font-bold text-primary">0.75</p>
            </div>
            <div className="p-3 bg-warning/5 rounded-lg">
              <p className="text-xs text-neutral-light mb-1">最大回撤</p>
              <p className="text-lg font-bold text-warning">-15.3%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 投资产品列表 */}
      <div className="card mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">投资产品列表</h3>
          <button className="text-sm font-medium text-primary hover:text-primary-dark transition-custom">
            查看全部
          </button>
        </div>
        
        {/* 表格 */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left text-xs font-medium text-neutral-light uppercase tracking-wider">产品名称</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-neutral-light uppercase tracking-wider">类型</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-neutral-light uppercase tracking-wider">持有金额</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-neutral-light uppercase tracking-wider">占比</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-neutral-light uppercase tracking-wider">近一年收益率</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-neutral-light uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {investmentProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-custom">
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-2 ${product.type === '股票' ? 'bg-red-100' : product.type === '基金' ? 'bg-blue-100' : product.type === '债券' ? 'bg-green-100' : 'bg-purple-100'}`}>
                        <i className={`fa ${product.type === '股票' ? 'fa-line-chart' : product.type === '基金' ? 'fa-pie-chart' : product.type === '债券' ? 'fa-money' : 'fa-bank'} ${product.type === '股票' ? 'text-red-500' : product.type === '基金' ? 'text-blue-500' : product.type === '债券' ? 'text-green-500' : 'text-purple-500'}`}></i>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-neutral-light">{product.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`text-xs px-2 py-1 rounded-full ${product.type === '股票' ? 'bg-red-100 text-red-500' : product.type === '基金' ? 'bg-blue-100 text-blue-500' : product.type === '债券' ? 'bg-green-100 text-green-500' : 'bg-purple-100 text-purple-500'}`}>
                      {product.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap font-medium">{formatCurrency(product.amount)}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5 mr-2">
                        <div 
                          className="h-1.5 rounded-full bg-primary"
                          style={{ width: `${product.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{product.percentage}%</span>
                    </div>
                  </td>
                  <td className={`py-4 px-4 whitespace-nowrap font-medium ${product.annualReturn >= 0 ? 'text-success' : 'text-danger'}`}>
                    {product.annualReturn >= 0 ? '+' : ''}{product.annualReturn}%
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-custom mr-2">
                      详情
                    </button>
                    <button className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-custom">
                      交易
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AssetAllocation;