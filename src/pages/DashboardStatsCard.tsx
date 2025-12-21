// DashboardStatsCard.tsx
import React from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  trend?: string;
  trendValue?: string;
  description?: string;
  colorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  trendValue,
  description,
  colorClass = "blue",
}) => {
  return (
    <div className={`stat-card stat-card-${colorClass}`}>
      <div className="stat-card-content">
        <div className="stat-card-header">
          <span className="stat-card-label">{label}</span>
          {trend && trendValue && (
            <span
              className={`stat-card-trend ${
                trend === "up" ? "trend-up" : "trend-down"
              }`}
            >
              {trend === "up" ? "↗" : "↘"} {trendValue}
            </span>
          )}
        </div>
        <div className="stat-card-value">{value}</div>
        {description && (
          <div className="stat-card-description">{description}</div>
        )}
      </div>
    </div>
  );
};

interface DashboardStatsProps {
  totalACOpened: number;
  onlineKYCRequest: number;
  staffInitiatedKYC: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalACOpened,
  onlineKYCRequest,
  staffInitiatedKYC,
}) => {
  return (
    <>
      <h2 className="section-title">Cards</h2>
      <div className="stats-grid">
        <StatCard
          label="Total AC Opened"
          value={totalACOpened}
          trend="up"
          trendValue="+12.5%"
          description="Accounts opened this month"
          colorClass="blue"
        />
        <StatCard
          label="Online KYC Request"
          value={onlineKYCRequest}
          trend="up"
          trendValue="+8.3%"
          description="Digital submissions"
          colorClass="green"
        />
        <StatCard
          label="Staff initiated KYC"
          value={staffInitiatedKYC}
          trend="down"
          trendValue="-5.2%"
          description="Manual submissions"
          colorClass="yellow"
        />
        <StatCard
          label="Pending Approval"
          value={25}
          trend="up"
          trendValue="+3"
          description="Awaiting review"
          colorClass="purple"
        />
      </div>
    </>
  );
};

export default DashboardStats;
