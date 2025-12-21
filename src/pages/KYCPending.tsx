import React, { useState } from "react";
import "../styles/KYCPending.css";

interface KYCRequest {
  id: string;
  customerName: string;
  accountNumber: string;
  email: string;
  phone: string;
  submissionDate: string;
  initiatedBy: "online" | "staff";
  status: "pending";
}

// Dummy data for pending KYC requests
const pendingRequests: KYCRequest[] = [
  {
    id: "KYC001",
    customerName: "John Doe",
    accountNumber: "AC123456",
    email: "john.doe@example.com",
    phone: "+1234567890",
    submissionDate: "2024-12-15",
    initiatedBy: "online",
    status: "pending",
  },
  {
    id: "KYC002",
    customerName: "Jane Smith",
    accountNumber: "AC123457",
    email: "jane.smith@example.com",
    phone: "+1234567891",
    submissionDate: "2024-12-16",
    initiatedBy: "staff",
    status: "pending",
  },
  {
    id: "KYC003",
    customerName: "Robert Johnson",
    accountNumber: "AC123458",
    email: "robert.j@example.com",
    phone: "+1234567892",
    submissionDate: "2024-12-17",
    initiatedBy: "online",
    status: "pending",
  },
  {
    id: "KYC004",
    customerName: "Emily Davis",
    accountNumber: "AC123459",
    email: "emily.davis@example.com",
    phone: "+1234567893",
    submissionDate: "2024-12-18",
    initiatedBy: "online",
    status: "pending",
  },
  {
    id: "KYC005",
    customerName: "Michael Brown",
    accountNumber: "AC123460",
    email: "michael.b@example.com",
    phone: "+1234567894",
    submissionDate: "2024-12-19",
    initiatedBy: "staff",
    status: "pending",
  },
  {
    id: "KYC006",
    customerName: "Sarah Wilson",
    accountNumber: "AC123461",
    email: "sarah.w@example.com",
    phone: "+1234567895",
    submissionDate: "2024-12-20",
    initiatedBy: "online",
    status: "pending",
  },
  {
    id: "KYC007",
    customerName: "James Anderson",
    accountNumber: "AC123462",
    email: "james.a@example.com",
    phone: "+1234567896",
    submissionDate: "2024-12-21",
    initiatedBy: "staff",
    status: "pending",
  },
];

const KYCPending: React.FC = () => {
  const [requests, setRequests] = useState<KYCRequest[]>(pendingRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "online" | "staff">(
    "all"
  );

  const handleApprove = (id: string) => {
    console.log("Approving KYC:", id);
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleReject = (id: string) => {
    console.log("Rejecting KYC:", id);
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleViewDetails = (id: string) => {
    console.log("Viewing details for:", id);
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" || req.initiatedBy === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
      <div className="header">
        <div>
          <h2 className="title"> Pending KYC</h2>
          <p className="subtitle">Review and approve pending KYC requests</p>
        </div>
        <div className="statsBar">
          <div className="statItem">
            <span className="statLabel">Total Pending</span>
            <span className="statValue">{requests.length}</span>
          </div>
          <div className="statItem">
            <span className="statLabel">Online</span>
            <span className="statValue">
              {requests.filter((r) => r.initiatedBy === "online").length}
            </span>
          </div>
          <div className="statItem">
            <span className="statLabel">Staff</span>
            <span className="statValue">
              {requests.filter((r) => r.initiatedBy === "staff").length}
            </span>
          </div>
        </div>
      </div>

      <div className="controls">
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search by name, account number, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />
        </div>
        <div className="filterContainer">
          <button
            className={`filterButton ${
              filterType === "all" ? "filterActive" : ""
            }`}
            onClick={() => setFilterType("all")}
          >
            All
          </button>
          <button
            className={`filterButton ${
              filterType === "online" ? "filterActive" : ""
            }`}
            onClick={() => setFilterType("online")}
          >
            Online
          </button>
          <button
            className={`filterButton ${
              filterType === "staff" ? "filterActive" : ""
            }`}
            onClick={() => setFilterType("staff")}
          >
            Staff
          </button>
        </div>
      </div>

      <div className="tableContainer">
        <table className="table">
          <thead className="tableHead">
            <tr>
              <th className="tableHeader">KYC ID</th>
              <th className="tableHeader">Customer Name</th>
              <th className="tableHeader">Account Number</th>
              <th className="tableHeader">Email</th>
              <th className="tableHeader">Phone</th>
              <th className="tableHeader">Submission Date</th>
              <th className="tableHeader">Type</th>
              <th className="tableHeader">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request.id} className="tableRow">
                  <td className="tableCell">
                    <span className="idBadge">{request.id}</span>
                  </td>
                  <td className="tableCellMedium">{request.customerName}</td>
                  <td className="tableCellGray">{request.accountNumber}</td>
                  <td className="tableCellGray">{request.email}</td>
                  <td className="tableCellGray">{request.phone}</td>
                  <td className="tableCellGray">{request.submissionDate}</td>
                  <td className="tableCell">
                    <span
                      className={`badge ${
                        request.initiatedBy === "online"
                          ? "badgeOnline"
                          : "badgeStaff"
                      }`}
                    >
                      {request.initiatedBy.charAt(0).toUpperCase() +
                        request.initiatedBy.slice(1)}
                    </span>
                  </td>
                  <td className="tableCell">
                    <div className="actionButtons">
                      <button
                        onClick={() => handleViewDetails(request.id)}
                        className="viewButton"
                        title="View Details"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="approveButton"
                        title="Approve"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="rejectButton"
                        title="Reject"
                      >
                        ✗
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="emptyState">
                  <div className="emptyStateContent">
                    <span className="emptyIcon">📋</span>
                    <p>No pending requests found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="footer">
        <div className="summary">
          Showing <strong>{filteredRequests.length}</strong> of{" "}
          <strong>{requests.length}</strong> pending requests
        </div>
      </div>
    </div>
  );
};

export default KYCPending;
