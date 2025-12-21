// DashboardGraphs.tsx
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dummy data for monthly KYC trends
const monthlyData = [
  { month: "Jan", totalAC: 45, onlineKYC: 30, staffKYC: 15 },
  { month: "Feb", totalAC: 52, onlineKYC: 35, staffKYC: 17 },
  { month: "Mar", totalAC: 61, onlineKYC: 42, staffKYC: 19 },
  { month: "Apr", totalAC: 48, onlineKYC: 28, staffKYC: 20 },
  { month: "May", totalAC: 70, onlineKYC: 50, staffKYC: 20 },
  { month: "Jun", totalAC: 65, onlineKYC: 45, staffKYC: 20 },
];

// Data for approval rate trend
const approvalData = [
  { month: "Jan", rate: 85 },
  { month: "Feb", rate: 88 },
  { month: "Mar", rate: 90 },
  { month: "Apr", rate: 87 },
  { month: "May", rate: 92 },
  { month: "Jun", rate: 91 },
];

// Data for processing time
const processingData = [
  { month: "Jan", hours: 24 },
  { month: "Feb", hours: 22 },
  { month: "Mar", hours: 20 },
  { month: "Apr", hours: 21 },
  { month: "May", hours: 18 },
  { month: "Jun", hours: 16 },
];

const DashboardGraphs: React.FC = () => {
  return (
    <div className="graphs-wrapper">
      <h2 className="section-title">Analytics</h2>

      <div className="graphs-grid">
        {/* Chart 1: KYC Submissions */}
        <div className="graph-card">
          <div className="graph-header">
            <h3 className="graph-title">KYC Submissions</h3>
            <p className="graph-subtitle">Monthly breakdown by type</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar
                dataKey="totalAC"
                fill="#8b5cf6"
                name="Total AC Opened"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="onlineKYC"
                fill="#10b981"
                name="Online KYC"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="staffKYC"
                fill="#f59e0b"
                name="Staff KYC"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Approval Rate */}
        <div className="graph-card">
          <div className="graph-header">
            <h3 className="graph-title">Approval Rate</h3>
            <p className="graph-subtitle">Percentage of approved KYC</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={approvalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Approval Rate (%)"
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Processing Time */}
        <div className="graph-card">
          <div className="graph-header">
            <h3 className="graph-title">Average Processing Time</h3>
            <p className="graph-subtitle">Hours to complete KYC</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={processingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#ec4899"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHours)"
                name="Processing Time (hrs)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraphs;
