import React, { useState } from 'react';
import { getFinancialGoals } from '../services/goalPlanningService';

const FinancialGoals: React.FC = () => {
  const goals = getFinancialGoals();
  const [activeTab, setActiveTab] = useState('all');

  // 格式化数字为货币格式
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      maximumFractionDigits: 0
    }).format(value);
  };

  // 过滤目标
  const filteredGoals = activeTab === 'all' 
    ? goals 
    : goals.filter(goal => goal.type === activeTab);

  // 获取目标进度颜色
  const getProgressColor = (progress: number): string => {
    if (progress >= 90) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-danger';
  };

  // 计算剩余时间
  const getRemainingTime = (startDate: string, targetDate: string): string => {
    const start = new Date(startDate);
    const target = new Date(targetDate);
    const now = new Date();
    
    const totalMonths = (target.getFullYear() - start.getFullYear()) * 12 + (target.getMonth() - start.getMonth());
    const elapsedMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const remainingMonths = totalMonths - elapsedMonths;
    
    if (remainingMonths <= 0) return '已到期';
    if (remainingMonths < 12) return `${remainingMonths}个月`;
    
    const years = Math.floor(remainingMonths / 12);
    const months = remainingMonths % 12;
    
    if (months === 0) return `${years}年`;
    return `${years}年${months}个月`;
  };

  return (
    <section id="goals" className="mb-16">
      <div className="flex items-center mb-8">
        <i className="fa fa-bullseye text-2xl text-primary mr-3"></i>
        <h2 className="text-2xl font-bold text-neutral">财务目标规划</h2>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        {/* 目标分类标签 */}
        <div className="flex space-x-2">
          <button 
            className={`text-xs px-3 py-1 rounded-full transition-custom ${activeTab === 'all' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary'}`}
            onClick={() => setActiveTab('all')}
          >
            全部目标
          </button>
          <button 
            className={`text-xs px-3 py-1 rounded-full transition-custom ${activeTab === 'education' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary'}`}
            onClick={() => setActiveTab('education')}
          >
            子女教育
          </button>
          <button 
            className={`text-xs px-3 py-1 rounded-full transition-custom ${activeTab === 'housing' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary'}`}
            onClick={() => setActiveTab('housing')}
          >
            购房首付
          </button>
          <button 
            className={`text-xs px-3 py-1 rounded-full transition-custom ${activeTab === 'retirement' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary'}`}
            onClick={() => setActiveTab('retirement')}
          >
            退休储备
          </button>
        </div>
        
        {/* 添加目标按钮 */}
        <button className="flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-custom">
          <i className="fa fa-plus-circle mr-1"></i>
          添加目标
        </button>
      </div>
      
      {/* 目标卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.map((goal, index) => (
          <div key={index} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center mb-1">
                  {/* 目标类型图标 */}
                  <div className={`p-2 rounded-full mr-2 ${goal.type === 'education' ? 'bg-blue-100' : goal.type === 'housing' ? 'bg-green-100' : 'bg-purple-100'}`}>
                    <i className={`fa ${goal.type === 'education' ? 'fa-graduation-cap' : goal.type === 'housing' ? 'fa-home' : 'fa-pagelines'} ${goal.type === 'education' ? 'text-blue-500' : goal.type === 'housing' ? 'text-green-500' : 'text-purple-500'}`}></i>
                  </div>
                  <h3 className="font-bold">{goal.name}</h3>
                </div>
                <p className="text-sm text-neutral-light">{goal.description}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{goal.status}</span>
            </div>
            
            {/* 目标金额信息 */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-neutral-light">目标金额</p>
                <p className="font-bold">{formatCurrency(goal.targetAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-light">已储蓄</p>
                <p className="font-bold text-primary">{formatCurrency(goal.currentAmount)}</p>
              </div>
            </div>
            
            {/* 进度条 */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-light">完成进度</span>
                <span className="font-medium">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* 剩余时间和操作按钮 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-neutral-light">
                <i className="fa fa-clock-o mr-1"></i>
                <span>剩余: {getRemainingTime(goal.startDate, goal.targetDate)}</span>
              </div>
              <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-custom">
                查看详情
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* 目标统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* 总目标数 */}
        <div className="card">
          <div className="flex items-center mb-2">
            <i className="fa fa-list-alt text-primary mr-2"></i>
            <h3 className="font-medium">总目标数</h3>
          </div>
          <p className="text-2xl font-bold">{goals.length}</p>
        </div>
        
        {/* 已完成目标 */}
        <div className="card">
          <div className="flex items-center mb-2">
            <i className="fa fa-check-circle text-success mr-2"></i>
            <h3 className="font-medium">已完成目标</h3>
          </div>
          <p className="text-2xl font-bold">{goals.filter(g => g.status === '完成').length}</p>
        </div>
        
        {/* 进行中目标 */}
        <div className="card">
          <div className="flex items-center mb-2">
            <i className="fa fa-spinner text-warning mr-2"></i>
            <h3 className="font-medium">进行中目标</h3>
          </div>
          <p className="text-2xl font-bold">{goals.filter(g => g.status === '进行中').length}</p>
        </div>
      </div>
    </section>
  );
};

export default FinancialGoals;