import React, { useState } from 'react';
import { getInsuranceProducts, getInsuranceSuggestions } from '../services/riskManagementService';

const RiskManagement: React.FC = () => {
  const insuranceProducts = getInsuranceProducts();
  const insuranceSuggestions = getInsuranceSuggestions();
  const [activeTab, setActiveTab] = useState('products');

  // 格式化数字为货币格式
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section id="risk-management" className="mb-16">
      <div className="flex items-center mb-8">
        <i className="fa fa-shield text-2xl text-primary mr-3"></i>
        <h2 className="text-2xl font-bold text-neutral">风险管理</h2>
      </div>
      
      {/* 风险评估评分卡片 */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="font-bold text-lg mb-1">家庭风险评估</h3>
            <p className="text-sm text-neutral-light">基于您的家庭情况和财务数据的综合风险评估</p>
          </div>
          <button className="mt-4 md:mt-0 text-sm font-medium text-primary hover:text-primary-dark transition-custom">
            重新评估风险
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 综合风险评分 */}
          <div className="bg-accent/5 p-5 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">综合风险评分</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">良好</span>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold">82</span>
              <span className="text-sm text-neutral-light mb-1">/ 100分</span>
            </div>
          </div>
          
          {/* 保障充足度 */}
          <div>
            <h4 className="font-medium mb-2">保障充足度</h4>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
              <div className="bg-success h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-neutral-light">
              <span>不足</span>
              <span>良好</span>
              <span>充足</span>
            </div>
          </div>
          
          {/* 风险承受能力 */}
          <div>
            <h4 className="font-medium mb-2">风险承受能力</h4>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
              <div className="bg-warning h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-neutral-light">
              <span>保守</span>
              <span>稳健</span>
              <span>积极</span>
            </div>
          </div>
          
          {/* 资产流动性 */}
          <div>
            <h4 className="font-medium mb-2">资产流动性</h4>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
              <div className="bg-danger h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-neutral-light">
              <span>较差</span>
              <span>中等</span>
              <span>良好</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 保险产品和建议 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 保险产品列表 */}
        <div className="card">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">保险产品持有</h3>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-3 py-1 rounded-full transition-custom ${activeTab === 'products' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary'}`}
                  onClick={() => setActiveTab('products')}
                >
                  已持有
                </button>
                <button 
                  className={`text-xs px-3 py-1 rounded-full transition-custom ${activeTab === 'coverage' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary'}`}
                  onClick={() => setActiveTab('coverage')}
                >
                  保障分析
                </button>
              </div>
            </div>
          </div>
          
          {activeTab === 'products' ? (
            <div className="p-6">
              <div className="space-y-4">
                {insuranceProducts.map((product, index) => (
                  <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 transition-custom">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className={`p-3 rounded-full mr-3 ${product.type === '重疾险' ? 'bg-red-100' : product.type === '医疗险' ? 'bg-blue-100' : product.type === '寿险' ? 'bg-green-100' : 'bg-purple-100'}`}>
                        <i className={`fa ${product.type === '重疾险' ? 'fa-heartbeat' : product.type === '医疗险' ? 'fa-stethoscope' : product.type === '寿险' ? 'fa-user-o' : 'fa-car'} ${product.type === '重疾险' ? 'text-red-500' : product.type === '医疗险' ? 'text-blue-500' : product.type === '寿险' ? 'text-green-500' : 'text-purple-500'}`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <div className="flex items-center text-sm text-neutral-light mt-1">
                          <span>{product.type}</span>
                          <span className="mx-2">|</span>
                          <span>保额: {formatCurrency(product.coverageAmount)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-custom">
                        详情
                      </button>
                      <button className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-custom">
                        续保
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-custom">
                添加新保单
              </button>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-6">
                {/* 重疾保障 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">重疾保障</h4>
                    <span className="text-sm font-medium text-success">充足</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                    <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-neutral-light mt-2">家庭主要收入来源已覆盖3-5倍年收入的重疾保障</p>
                </div>
                
                {/* 医疗保障 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">医疗保障</h4>
                    <span className="text-sm font-medium text-success">充足</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                    <div className="bg-success h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <p className="text-xs text-neutral-light mt-2">全家均配置了百万医疗险，覆盖高额医疗费用风险</p>
                </div>
                
                {/* 寿险保障 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">寿险保障</h4>
                    <span className="text-sm font-medium text-warning">不足</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-xs text-neutral-light mt-2">建议增加定期寿险保额至家庭负债的1.5倍以上</p>
                </div>
                
                {/* 意外保障 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">意外保障</h4>
                    <span className="text-sm font-medium text-warning">不足</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <p className="text-xs text-neutral-light mt-2">建议补充综合意外险，提高意外医疗和伤残保障</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 保险建议 */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">风险管理建议</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">专家建议</span>
          </div>
          
          <div className="space-y-4">
            {insuranceSuggestions.map((suggestion, index) => (
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
          
          {/* 风险缺口计算器入口 */}
          <div className="mt-6 p-4 bg-accent/5 rounded-lg">
            <h4 className="font-medium mb-2">需要更详细的风险评估？</h4>
            <p className="text-sm text-neutral-light mb-4">使用我们的风险缺口计算器，获取个性化的风险管理方案</p>
            <button className="w-full py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-dark transition-custom">
              使用风险缺口计算器
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskManagement;