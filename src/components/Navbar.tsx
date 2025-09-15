import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // 监听滚动事件，控制导航栏样式和当前活动部分
  useEffect(() => {
    const handleScroll = () => {
      // 导航栏滚动效果
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 确定当前活动部分
      const sections = ['overview', 'analysis', 'planning', 'portfolio', 'insurance', 'retirement'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 初始化
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理锚点点击，平滑滚动到对应部分
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100, // 考虑导航栏高度和额外间距
        behavior: 'smooth'
      });
    }
  };

  // 处理窗口大小变化，关闭移动端菜单
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header 
      id="navbar" 
      className={`fixed w-full bg-surface bg-opacity-95 backdrop-blur-sm z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'} py-3`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center space-x-2">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center space-x-2 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <i className="fa fa-line-chart text-primary text-2xl pulse"></i>
                <span className="font-bold text-lg md:text-xl text-primary whitespace-nowrap">家庭财富管家</span>
              </a>
            </div>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 text-sm lg:text-base overflow-x-auto hide-scrollbar">
            <a 
              href="#overview" 
              onClick={(e) => handleAnchorClick(e, 'overview')}
              className={`font-medium whitespace-nowrap py-2 transition-all duration-300 relative ${activeSection === 'overview' ? 'text-primary' : 'text-neutral hover:text-primary'}`}
            >
              财务概览
              {activeSection === 'overview' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all duration-300" />
              )}
            </a>
            <a 
              href="#analysis" 
              onClick={(e) => handleAnchorClick(e, 'analysis')}
              className={`font-medium whitespace-nowrap py-2 transition-all duration-300 relative ${activeSection === 'analysis' ? 'text-primary' : 'text-neutral hover:text-primary'}`}
            >
              财务分析
              {activeSection === 'analysis' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all duration-300" />
              )}
            </a>
            <a 
              href="#planning" 
              onClick={(e) => handleAnchorClick(e, 'planning')}
              className={`font-medium whitespace-nowrap py-2 transition-all duration-300 relative ${activeSection === 'planning' ? 'text-primary' : 'text-neutral hover:text-primary'}`}
            >
              目标规划
              {activeSection === 'planning' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all duration-300" />
              )}
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => handleAnchorClick(e, 'portfolio')}
              className={`font-medium whitespace-nowrap py-2 transition-all duration-300 relative ${activeSection === 'portfolio' ? 'text-primary' : 'text-neutral hover:text-primary'}`}
            >
              资产配置
              {activeSection === 'portfolio' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all duration-300" />
              )}
            </a>
            <a 
              href="#insurance" 
              onClick={(e) => handleAnchorClick(e, 'insurance')}
              className={`font-medium whitespace-nowrap py-2 transition-all duration-300 relative ${activeSection === 'insurance' ? 'text-primary' : 'text-neutral hover:text-primary'}`}
            >
              风险管理
              {activeSection === 'insurance' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all duration-300" />
              )}
            </a>
            <a 
              href="#retirement" 
              onClick={(e) => handleAnchorClick(e, 'retirement')}
              className={`font-medium whitespace-nowrap py-2 transition-all duration-300 relative ${activeSection === 'retirement' ? 'text-primary' : 'text-neutral hover:text-primary'}`}
            >
              退休规划
              {activeSection === 'retirement' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all duration-300" />
              )}
            </a>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button 
              id="menu-button" 
              className="text-neutral hover:text-primary focus:outline-none p-2 rounded-lg hover:bg-primary/5 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="菜单"
            >
              <i className={`fa text-xl transition-transform duration-300 ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* 移动端导航菜单 */}
      <div 
        id="mobile-menu" 
        className={`md:hidden absolute w-full bg-surface shadow-lg border-t border-border overflow-hidden transition-all duration-300 ease-in-out z-40`}
        style={{
          maxHeight: isMenuOpen ? '500px' : '0',
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-5px)',
          opacity: isMenuOpen ? 1 : 0
        }}
      >
        <div className="px-4 py-3 space-y-1">
          <a 
            href="#overview" 
            onClick={(e) => handleAnchorClick(e, 'overview')}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${activeSection === 'overview' ? 'bg-primary/10 text-primary' : 'text-neutral hover:bg-primary/5 hover:text-primary'}`}
          >
            <i className="fa fa-dashboard mr-3 w-5 text-center"></i>财务概览
          </a>
          <a 
            href="#analysis" 
            onClick={(e) => handleAnchorClick(e, 'analysis')}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${activeSection === 'analysis' ? 'bg-primary/10 text-primary' : 'text-neutral hover:bg-primary/5 hover:text-primary'}`}
          >
            <i className="fa fa-chart-line mr-3 w-5 text-center"></i>财务分析
          </a>
          <a 
            href="#planning" 
            onClick={(e) => handleAnchorClick(e, 'planning')}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${activeSection === 'planning' ? 'bg-primary/10 text-primary' : 'text-neutral hover:bg-primary/5 hover:text-primary'}`}
          >
            <i className="fa fa-bullseye mr-3 w-5 text-center"></i>目标规划
          </a>
          <a 
            href="#portfolio" 
            onClick={(e) => handleAnchorClick(e, 'portfolio')}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${activeSection === 'portfolio' ? 'bg-primary/10 text-primary' : 'text-neutral hover:bg-primary/5 hover:text-primary'}`}
          >
            <i className="fa fa-pie-chart mr-3 w-5 text-center"></i>资产配置
          </a>
          <a 
            href="#insurance" 
            onClick={(e) => handleAnchorClick(e, 'insurance')}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${activeSection === 'insurance' ? 'bg-primary/10 text-primary' : 'text-neutral hover:bg-primary/5 hover:text-primary'}`}
          >
            <i className="fa fa-shield mr-3 w-5 text-center"></i>风险管理
          </a>
          <a 
            href="#retirement" 
            onClick={(e) => handleAnchorClick(e, 'retirement')}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${activeSection === 'retirement' ? 'bg-primary/10 text-primary' : 'text-neutral hover:bg-primary/5 hover:text-primary'}`}
          >
            <i className="fa fa-sun-o mr-3 w-5 text-center"></i>退休规划
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;