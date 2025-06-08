import React, { useState } from "react";
import "./MainHeroSection.css";
import MainSectionTransactions from "./MainSectionBody/MainSectionTransactions.jsx";
import SidebarButton from "./Buttons/SidebarButton";
import MainSectionDues from "./MainSectionBody/MainSectionDues.jsx";
import MainSectionBudgets from './MainSectionBody/MainSectionBudgets.jsx'
import MainSectionSubs from './MainSectionBody/MainSectionSubs.jsx'
import MainSectionEmi from './MainSectionBody/MainSectionEmi.jsx'
import Chatbot from "./MainSectionBody/MainSectionChatbot.jsx";
import Noth from './MainSectionBody/MainSectionNone.jsx';

const MainHeroSection = () => {
  const [page, setPage] = useState(0);

  return (
    <div className="hero-section">
      {/* Sidebar */}
      <div className="sidebar">
        <SidebarButton text="Budgets" clickHandler={() => setPage(1)} />
        <SidebarButton text="Transactions" clickHandler={() => setPage(2)} />
        <SidebarButton text="Dues" clickHandler={() => setPage(3)} />
        <SidebarButton text="Subscriptions" clickHandler={() => setPage(4)} />
        <SidebarButton text="EMIs" clickHandler={() => setPage(5)} />
        <SidebarButton text="Chatbot" clickHandler={() => setPage(6)} />
      </div>

      {/* Main Content */}
      {page === 2 && <MainSectionTransactions />}
      {page === 3 && <MainSectionDues />}
      {page === 4 && <MainSectionSubs />}
      {page === 1 && <MainSectionBudgets/>}
      {page === 6 && <Chatbot/>}
      {page === 0 && <Noth/>}
      {page === 5 && <MainSectionEmi/>}
      {/* Filler content to demonstrate scrolling */}
    </div>
  );
};

export default MainHeroSection;