import React, { useState } from "react";
import "../styles/KYCApproved.css";

interface ApprovedKYC {
  id: string;
  customerName: string;
  accountNumber: string;
  email: string;
  phone: string;
  submissionDate: string;
  approvalDate: string;
  approvedBy: string;
  initiatedBy: "online" | "staff";
  status: "approved";
}

// Dummy data for approved KYC requests
const approvedRequests: ApprovedKYC[] = [
  {
    id: "KYC101",
    customerName: "Alice Williams",
    accountNumber: "AC123401",
    email: "alice.w@example.com",
    phone: "+1234567801",
    submissionDate: "2024-12-01",
    approvalDate: "2024-12-03",
    approvedBy: "Admin User",
    initiatedBy: "online",
    status: "approved",
  },
  {
    id: "KYC102",
    customerName: "Bob Martin",
    accountNumber: "AC123402",
    email: "bob.martin@example.com",
    phone: "+1234567802",
    submissionDate: "2024-12-02",
    approvalDate: "2024-12-04",
    approvedBy: "Manager",
    initiatedBy: "staff",
    status: "approved",
  },
  {
    id: "KYC103",
    customerName: "Carol Taylor",
    accountNumber: "AC123403",
    email: "carol.t@example.com",
    phone: "+1234567803",
    submissionDate: "2024-12-05",
    approvalDate: "2024-12-06",
    approvedBy: "Admin User",
    initiatedBy: "online",
    status: "approved",
  },
  {
    id: "KYC104",
    customerName: "David Anderson",
    accountNumber: "AC123404",
    email: "david.a@example.com",
    phone: "+1234567804",
    submissionDate: "2024-12-07",
    approvalDate: "2024-12-09",
    approvedBy: "Manager",
    initiatedBy: "online",
    status: "approved",
  },
  {
    id: "KYC105",
    customerName: "Eva Martinez",
    accountNumber: "AC123405",
    email: "eva.martinez@example.com",
    phone: "+1234567805",
    submissionDate: "2024-12-08",
    approvalDate: "2024-12-10",
    approvedBy: "Admin User",
    initiatedBy: "staff",
    status: "approved",
  },
  {
    id: "KYC106",
    customerName: "Frank Thomas",
    accountNumber: "AC123406",
    email: "frank.t@example.com",
    phone: "+1234567806",
    submissionDate: "2024-12-10",
    approvalDate: "2024-12-12",
    approvedBy: "Manager",
    initiatedBy: "online",
    status: "approved",
  },
  {
    id: "KYC107",
    customerName: "Grace Lee",
    accountNumber: "AC123407",
    email: "grace.l@example.com",
    phone: "+1234567807",
    submissionDate: "2024-12-11",
    approvalDate: "2024-12-13",
    approvedBy: "Admin User",
    initiatedBy: "online",
    status: "approved",
  },
  {
    id: "KYC108",
    customerName: "Henry Clark",
    accountNumber: "AC123408",
    email: "henry.c@example.com",
    phone: "+1234567808",
    submissionDate: "2024-12-12",
    approvalDate: "2024-12-14",
    approvedBy: "Manager",
    initiatedBy: "staff",
    status: "approved",
  },
];

const KYCApproved: React.FC = () => {
  const [requests] = useState<ApprovedKYC[]>(approvedRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "online" | "staff">(
    "all"
  );

  const handleViewDetails = (id: string) => {
    console.log("Viewing details for KYC:", id);
    window.open("/rbbb.html", "_blank");
  };

  const handleDownloadReport = (id: string) => {
    console.log("Downloading report for:", id);
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
          <h2 className="title">KYC Approved</h2>
          <p className="subtitle">View all approved KYC records</p>
        </div>
        <div className="statsBar">
          <div className="statItem">
            <span className="statLabel">Total Approved</span>
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
              <th className="tableHeader">Approval Date</th>
              <th className="tableHeader">Approved By</th>
              <th className="tableHeader">Type</th>
              <th className="tableHeader">Status</th>
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
                  <td className="tableCellGray">{request.approvalDate}</td>
                  <td className="tableCellGray">{request.approvedBy}</td>
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
                    <span className="badge badgeApproved"> Approved</span>
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
                        onClick={() => handleDownloadReport(request.id)}
                        className="downloadButton"
                        title="Download Report"
                      >
                        ⬇
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="emptyState">
                  <div className="emptyStateContent">
                    <span className="emptyIcon">✓</span>
                    <p>No approved requests found</p>
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
          <strong>{requests.length}</strong> approved records
        </div>
      </div>
    </div>
  );
};

export default KYCApproved;
