import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="mb-16 text-center fade-in">
      <div className="card p-8 md:p-12">
        <h1 className="font-bold text-primary mb-6">家庭财富管理工具</h1>
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-neutral-light max-w-3xl mx-auto leading-relaxed">
          基于AFP金融理财师专业知识，为您提供全面的家庭财务健康评估、个性化理财规划和风险管理方案
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center bg-primary/10 px-6 py-3 rounded-full">
            <i className="fa fa-check-circle text-primary mr-2"></i>
            <span className="text-primary font-medium">专业评估</span>
          </div>
          <div className="flex items-center bg-primary/10 px-6 py-3 rounded-full">
            <i className="fa fa-check-circle text-primary mr-2"></i>
            <span className="text-primary font-medium">个性化规划</span>
          </div>
          <div className="flex items-center bg-primary/10 px-6 py-3 rounded-full">
            <i className="fa fa-check-circle text-primary mr-2"></i>
            <span className="text-primary font-medium">风险管理</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;