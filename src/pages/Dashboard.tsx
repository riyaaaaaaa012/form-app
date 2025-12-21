// Dashboard.tsx
import React, { useState } from "react";
import DashboardStatsCard from "./DashboardStatsCard";
import "../styles/Dashboard.css"; // import the CSS
import DashboardGraphs from "./DashboardGraphs";
import Home from "./Home";
import KYCApproval from "./KYCPending";
import KYCApproved from "./KYCApproved";
import KYCPending from "./KYCPending";

type PageType =
  | "dashboard"
  | "kycForm"
  | "kycApproval"
  | "kycApproved"
  | "report";

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  // Dummy stats data
  const stats = {
    totalACOpened: 245,
    onlineKYCRequest: 180,
    staffInitiatedKYC: 65,
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <div className="dashboard-content">
            <DashboardStatsCard
              totalACOpened={stats.totalACOpened}
              onlineKYCRequest={stats.onlineKYCRequest}
              staffInitiatedKYC={stats.staffInitiatedKYC}
            />
            <DashboardGraphs />
          </div>
        );
      case "kycForm":
        return <Home />;
      case "kycApproval":
        return <KYCPending />;
      //   <div className="page-content">
      //     KYC Approval - Listing all pending KYC Request
      //   </div>
      // );
      case "kycApproved":
        return <KYCApproved />;
      // return (
      //   <div className="page-content">
      //     KYC Approved - Listing all Approved KYC
      //   </div>
      // );
      case "report":
        return <div className="page-content">Report Page</div>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>KYC System</h2>
        <nav>
          <ul>
            <li className={currentPage === "dashboard" ? "active" : ""}>
              <button onClick={() => setCurrentPage("dashboard")}>
                <span className="page-number">1</span> Dashboard
              </button>
            </li>
            <li className={currentPage === "kycForm" ? "active" : ""}>
              <button onClick={() => setCurrentPage("kycForm")}>
                <span className="page-number">2</span> KYC Form
              </button>
            </li>
            <li className={currentPage === "kycApproval" ? "active" : ""}>
              <button onClick={() => setCurrentPage("kycApproval")}>
                <span className="page-number">3</span> Pending KYC
              </button>
            </li>
            <li className={currentPage === "kycApproved" ? "active" : ""}>
              <button onClick={() => setCurrentPage("kycApproved")}>
                <span className="page-number">4</span> KYC Approved
              </button>
            </li>
            <li className={currentPage === "report" ? "active" : ""}>
              <button onClick={() => setCurrentPage("report")}>
                <span className="page-number">5</span> Report
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
