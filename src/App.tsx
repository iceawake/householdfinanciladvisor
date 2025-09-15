import Navbar from './components/Navbar';
import WelcomeSection from './components/WelcomeSection';
import FinancialOverview from './components/FinancialOverview';
import MonthlyIncomeExpense from './components/MonthlyIncomeExpense';
import FinancialGoals from './components/FinancialGoals';
import AssetAllocation from './components/AssetAllocation';
import FinancialFreedom from './components/FinancialFreedom';
import RiskManagement from './components/RiskManagement';
import RetirementPlanning from './components/RetirementPlanning';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <Navbar />
      
      {/* 主内容区域 - 增加上边距避免与导航栏重叠 */}
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <WelcomeSection />
        <FinancialOverview />
        <FinancialFreedom />
        <MonthlyIncomeExpense />
        <FinancialGoals />
        <AssetAllocation />
        <RiskManagement />
        <RetirementPlanning />
      </main>
      
      {/* 页脚 */}
      <Footer />
    </div>
  );
}

export default App;
