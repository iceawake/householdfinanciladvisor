import React from 'react';

const Footer: React.FC = () => {
  // 处理锚点点击，平滑滚动到对应部分
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // 考虑导航栏高度
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <i className="fa fa-line-chart text-primary text-xl mr-2 pulse"></i>
            <span className="font-bold text-lg text-primary">家庭财富管家</span>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0 gap-3">
            <a 
              href="#overview" 
              onClick={(e) => handleAnchorClick(e, 'overview')}
              className="text-neutral-light hover:text-primary transition-all duration-300 hover:bg-primary/5 px-2 py-1 rounded-md"
            >
              财务概览
            </a>
            <a 
              href="#analysis" 
              onClick={(e) => handleAnchorClick(e, 'analysis')}
              className="text-neutral-light hover:text-primary transition-all duration-300 hover:bg-primary/5 px-2 py-1 rounded-md"
            >
              财务分析
            </a>
            <a 
              href="#planning" 
              onClick={(e) => handleAnchorClick(e, 'planning')}
              className="text-neutral-light hover:text-primary transition-all duration-300 hover:bg-primary/5 px-2 py-1 rounded-md"
            >
              目标规划
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => handleAnchorClick(e, 'portfolio')}
              className="text-neutral-light hover:text-primary transition-all duration-300 hover:bg-primary/5 px-2 py-1 rounded-md"
            >
              资产配置
            </a>
            <a 
              href="#insurance" 
              onClick={(e) => handleAnchorClick(e, 'insurance')}
              className="text-neutral-light hover:text-primary transition-all duration-300 hover:bg-primary/5 px-2 py-1 rounded-md"
            >
              风险管理
            </a>
            <a 
              href="#retirement" 
              onClick={(e) => handleAnchorClick(e, 'retirement')}
              className="text-neutral-light hover:text-primary transition-all duration-300 hover:bg-primary/5 px-2 py-1 rounded-md"
            >
              退休规划
            </a>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-neutral-light hover:text-primary transition-all duration-300 hover:bg-primary/5 p-2 rounded-full"><i className="fa fa-weixin text-xl"></i></a>
            <a href="#" className="text-neutral-light hover:text-primary transition-all duration-300 hover:bg-primary/5 p-2 rounded-full"><i className="fa fa-weibo text-xl"></i></a>
            <a href="#" className="text-neutral-light hover:text-primary transition-all duration-300 hover:bg-primary/5 p-2 rounded-full"><i className="fa fa-qq text-xl"></i></a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-neutral-light">© 2023 家庭财富管家 版权所有 | 本工具仅供参考，不构成投资建议</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;